const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('text-input');
const downloadBtn = document.getElementById('downloadBtn');
const thumbnailList = document.getElementById('thumbnail-list');

let config = {};
const images = {
    bg: new Image(),
    overlay: new Image(),
    char: new Image()
};

// 初期化処理
async function init() {
    try {
        const res = await fetch('list.json');
        config = await res.json();

        // キャンバスサイズをJSONから設定（内部解像度）
        canvas.width = config.canvas.width;
        canvas.height = config.canvas.height;

        // 背景とオーバーレイのパス設定
        images.bg.src = `assets/background/${config.background}`;
        images.overlay.src = `assets/overlay/${config.overlay}`;

        // サムネイル一覧の生成
        generateThumbnailList();

        // 画像読み込み後に描画
        images.bg.onload = draw;
        images.overlay.onload = draw;

    } catch (error) {
        console.error("設定の読み込みに失敗しました:", error);
    }
}

// サムネイルボタンを生成する関数
function generateThumbnailList() {
    config.characters.forEach((c, index) => {
        const img = document.createElement('img');
        img.src = `assets/character/${c.file}`;
        img.alt = c.name;
        img.className = 'char-thumbnail';
        
        // クリックイベント
        img.addEventListener('click', () => {
            // 選択状態の見た目を更新
            document.querySelectorAll('.char-thumbnail').forEach(t => t.classList.remove('selected'));
            img.classList.add('selected');

            // 選択されたキャラクター画像を設定して描画
            images.char.src = img.src;
            images.char.onload = draw;
        });

        // リストに追加
        thumbnailList.appendChild(img);

        // 初期選択（最初の画像を自動選択状態にする場合）
        if (index === 0) {
            // img.click(); // 自動でクリックイベントを発生させる
        }
    });
}

// 描画処理（ご指定のレイヤー順）
function draw() {
    // 1. キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 背景 (最下層)
    if (images.bg.complete) ctx.drawImage(images.bg, 0, 0);

    // 3. キャラクター（選択されたものがあれば描画）
    if (images.char.complete && images.char.src) {
        // フルサイズ(2560x1092)で重ねる
        ctx.drawImage(images.char, 0, 0);
    }

    // 4. オーバーレイ
    if (images.overlay.complete) ctx.drawImage(images.overlay, 0, 0);

    // 5. 文字 (最上層)
    ctx.fillStyle = '#FFFFFF'; // 例: 白文字
    ctx.font = 'bold 80px sans-serif'; // フォントサイズ固定
    ctx.textAlign = 'right';
    
    const lines = textInput.value.split('\n');
    // 右上の配置に合わせて調整してください (現在の設定は右端から少し内側)
    lines.forEach((line, i) => {
        ctx.fillText(line, 2400, 300 + (i * 100)); 
    });
}

// テキスト入力時の再描画
textInput.addEventListener('input', draw);

// PNG保存処理（常にフル解像度で出力）
downloadBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = 'generated_image.png';
    link.href = dataURL;
    link.click();
});

// アプリ開始
init();
