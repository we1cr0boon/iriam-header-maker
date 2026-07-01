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

async function init() {
    try {
        const res = await fetch('list.json');
        config = await res.json();
        
        // サイズの反映
        canvas.width = config.canvas.width;
        canvas.height = config.canvas.height;
        
        // 画像ロード
        images.bg.src = `assets/background/${config.background}`;
        images.overlay.src = `assets/overlay/${config.overlay}`;
        
        // 全画像ロード後に描画
        [images.bg, images.overlay].forEach(img => img.onload = draw);
        
        config.characters.forEach(c => {
            const img = document.createElement('img');
            img.src = `assets/character/${c.file}`;
            img.className = 'char-thumbnail';
            img.onclick = () => {
                document.querySelectorAll('.char-thumbnail').forEach(t => t.classList.remove('selected'));
                img.classList.add('selected');
                images.char.src = img.src;
                images.char.onload = draw; // キャラ選択時にも描画
            };
            thumbnailList.appendChild(img);
        });
    } catch (e) {
        console.error("読み込みエラー:", e);
    }
}

function draw() {
    // 描画前にサイズ確認
    if (canvas.width === 0) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 背景とキャラとオーバーレイを描画
    if (images.bg.complete) ctx.drawImage(images.bg, 0, 0);
    if (images.char.complete && images.char.src) ctx.drawImage(images.char, 0, 0);
    if (images.overlay.complete) ctx.drawImage(images.overlay, 0, 0);

    // 文字
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formattedDate, 2400, 200);

    let msg = "いつもありがとう！\nこれからもよろしくね！";
    if (document.getElementById('check2').checked) msg = document.getElementById('num2').value + "ヶ月連続";
    else if (document.getElementById('check3').checked) msg = document.getElementById('num3').value + "回目";

    msg.split('\n').forEach((line, i) => ctx.fillText(line, 2400, 400 + (i * 100)));
}

// イベント設定
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
