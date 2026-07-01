const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const thumbnailList = document.getElementById('thumbnail-list');
const downloadBtn = document.getElementById('downloadBtn');
const msgChecks = document.querySelectorAll('.msg-check');

let config = {};
const images = { bg: new Image(), overlay: new Image(), char: new Image() };

const now = new Date();
const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;

async function init() {
    const res = await fetch('list.json');
    config = await res.json();
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    images.bg.src = `assets/background/${config.background}`;
    images.overlay.src = `assets/overlay/${config.overlay}`;
    
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
    [images.bg, images.overlay].forEach(img => img.onload = draw);
}

msgChecks.forEach(chk => {
    chk.onchange = () => {
        if (chk.checked) msgChecks.forEach(other => { if (other !== chk) other.checked = false; });
        draw();
    };
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (images.bg.complete) ctx.drawImage(images.bg, 0, 0);
    if (images.char.complete && images.char.src) ctx.drawImage(images.char, 0, 0);
    if (images.overlay.complete) ctx.drawImage(images.overlay, 0, 0);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formattedDate, 2400, 200);

    let msg = "いつもありがとう！\nこれからもよろしくね！";
    if (document.getElementById('check1').checked) msg = "初めて";
    else if (document.getElementById('check2').checked) msg = "○ヶ月連続";
    else if (document.getElementById('check3').checked) msg = "○回目";

    msg.split('\n').forEach((line, i) => ctx.fillText(line, 2400, 400 + (i * 100)));
}

downloadBtn.onclick = () => {
    const link = document.createElement('a');
    link.download = 'header_image.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
};

init();
