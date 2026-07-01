const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const thumbnailList = document.getElementById('thumbnail-list');
const downloadBtn = document.getElementById('downloadBtn');
const msgChecks = document.querySelectorAll('.msg-check');
const numInputs = document.querySelectorAll('.num-input');

let config = {};
const images = { bg: new Image(), overlay: new Image(), char: new Image() };
const now = new Date();
const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;

// 描画のメイン関数
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 画像が読み込まれていれば描画、なければ無視する安全設計
    if (images.bg.complete) ctx.drawImage(images.bg, 0, 0);
    if (images.char.complete && images.char.src) ctx.drawImage(images.char, 0, 0);
    if (images.overlay.complete) ctx.drawImage(images.overlay, 0, 0);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formattedDate, 2400, 200);

    let msg = "いつもありがとう！\nこれからもよろしくね！";
    if (document.getElementById('check2').checked) msg = (document.getElementById('num2').value || "0") + "ヶ月連続";
    else if (document.getElementById('check3').checked) msg = (document.getElementById('num3').value || "0") + "回目";

    msg.split('\n').forEach((line, i) => ctx.fillText(line, 2400, 400 + (i * 100)));
}

async function init() {
    try {
        const res = await fetch('list.json');
        config = await res.json();
        canvas.width = config.canvas.width;
        canvas.height = config.canvas.height;
        
        images.bg.src = `assets/background/${config.background}`;
        images.overlay.src = `assets/overlay/${config.overlay}`;
        
        // 全画像ロード後の再描画
        [images.bg, images.overlay].forEach(img => img.onload = draw);
        
        config.characters.forEach(c => {
            const img = document.createElement('img');
            img.src = `assets/character/${c.file}`;
            img.className = 'char-thumbnail';
            img.onclick = () => {
                document.querySelectorAll('.char-thumbnail').forEach(t => t.classList.remove('selected'));
                img.classList.add('selected');
                images.char.src = img.src;
                images.char.onload = draw;
            };
            thumbnailList.appendChild(img);
        });

        // 最初の状態を描画
        draw();
    } catch (e) {
        console.error("エラー発生:", e);
    }
}

// 動作設定
msgChecks.forEach((chk, idx) => {
    chk.onchange = () => {
        if (chk.checked) {
            msgChecks.forEach((other, i) => {
                if (other !== chk) other.checked = false;
                if (numInputs[i]) numInputs[i].style.display = 'none';
            });
            if (numInputs[idx]) numInputs[idx].style.display = 'inline-block';
        } else {
            if (numInputs[idx]) numInputs[idx].style.display = 'none';
        }
        draw();
    };
});
numInputs.forEach(n => n.oninput = draw);
downloadBtn.onclick = () => {
    const link = document.createElement('a');
    link.download = 'header.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
};

init();
