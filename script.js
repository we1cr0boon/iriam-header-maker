const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const thumbnailList = document.getElementById('thumbnail-list');
const downloadBtn = document.getElementById('downloadBtn');
const msgChecks = document.querySelectorAll('.msg-check');

let config = {};
const images = {
    bg: new Image(),
    overlay: new Image(),
    char: new Image()
};

// 現在の日付を取得
const now = new Date();
const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;

// 初期化処理
async function init() {
    try {
        const res = await fetch('list.json');
        config = await res.json();

        // Canvas内部解像度を2560x1092に固定
        canvas.width = config.canvas.width;
        canvas.height = config.canvas.height;

        // 背景とオーバーレイのパス設定
        images.bg.src = `assets/background/${config.background}`;
        images.overlay.src = `assets/overlay/${config.overlay}`;

        // サムネイル生成
        generateThumbnailList();

        // 画像読み込み完了後に描画
        [images.bg, images.overlay].forEach(img => img.onload = draw);
    } catch (error) {
        console.error("設定の読み込みに失敗しました:", error);
    }
}

// サムネイルボタン生成
function generateThumbnailList() {
    config.characters.forEach((c, index) => {
        const img = document.createElement('img');
        img.src = `assets/character/${c.file}`;
        img.alt = c.name;
        img.className = 'char-thumbnail';
        
        img.addEventListener('click', () => {
            document.querySelectorAll('.char-thumbnail').forEach(t => t.classList.remove('selected'));
            img.classList.add('selected');
            images.char.src = img.src;
            images.char.onload = draw;
        });
        thumbnailList.appendChild(img);
    });
}

// メッセージ選択の排他制御
msgChecks.forEach(chk => {
    chk.addEventListener('change', () => {
        if (chk.checked) {
            msgChecks.forEach(other => { if (other !== chk) other.checked = false; });
        }
        draw();
    });
});

// 描画処理
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. 背景 (最下層)
    if (images.bg.complete) ctx.drawImage(images.bg, 0, 0);
    
    // 2. キャラクター
    if (images.char.complete && images.char.src) ctx.drawImage(images.char, 0, 0);
    
    // 3. オーバーレイ
    if (images.overlay.complete) ctx.drawImage(images.overlay, 0, 0);

    // 4. テキスト (最前面)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'right';

    // 日付描画
    ctx.fillText(formattedDate, 2400, 200);

    // メッセージ描画
    let msg = "いつもありがとう！\nこれからもよろしくね！";
    if (document.getElementById('check1').checked) msg = "初めて";
    else if (document.getElementById('check2').checked) msg = "○ヶ月連続";
    else if (document.getElementById('check3').checked) msg = "○回目";

    const lines = msg.split('\n');
    lines.forEach((line, i) => {
        ctx.fillText(line, 2400, 400 + (i * 100));
    });
}

// ダウンロード処理
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'header_image.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
});

// アプリ起動
init();
