// ================================
// 要素取得
// ================================

const characterButtons = document.querySelectorAll(".character-btn");

const characterImage = document.getElementById("characterImage");

const dateInput = document.getElementById("dateInput");

const dateText = document.getElementById("dateText");

const firstCheck = document.getElementById("firstCheck");

const continuousCheck = document.getElementById("continuousCheck");

const countCheck = document.getElementById("countCheck");

const continuousValue = document.getElementById("continuousValue");

const countValue = document.getElementById("countValue");

const badgeText = document.getElementById("badgeText");

const downloadBtn = document.getElementById("downloadBtn");

const preview = document.getElementById("preview");


// ================================
// キャラクター切替
// ================================

characterButtons.forEach(button => {

    button.addEventListener("click", () => {

        characterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        characterImage.src = button.dataset.image;

    });

});


// ================================
// 日付更新
// ================================

function updateDate() {

    let value = dateInput.value.trim();

    value = value.replace("-", ".");

    dateText.textContent = value;

}

dateInput.addEventListener("input", updateDate);


// ================================
// バッジ文章更新
// ================================

function updateBadgeText() {

    // 初めて優先

    if (firstCheck.checked) {

        badgeText.innerHTML = "初めて";

        return;

    }

    const texts = [];

    if (continuousCheck.checked) {

        texts.push(
            continuousValue.value + "ヶ月連続"
        );

    }

    if (countCheck.checked) {

        texts.push(
            countValue.value + "回目"
        );

    }

    if (texts.length === 0) {

        badgeText.innerHTML =
            "いつもありがとう！<br>これからもよろしくね！";

    } else {

        badgeText.innerHTML =
            texts.join("");

    }

}


// ================================
// イベント登録
// ================================

firstCheck.addEventListener(
    "change",
    updateBadgeText
);

continuousCheck.addEventListener(
    "change",
    updateBadgeText
);

countCheck.addEventListener(
    "change",
    updateBadgeText
);

continuousValue.addEventListener(
    "input",
    updateBadgeText
);

countValue.addEventListener(
    "input",
    updateBadgeText
);


// ================================
// PNG保存
// ================================

downloadBtn.addEventListener("click", () => {

    html2canvas(preview, {

        scale: 2,

        useCORS: true,

        backgroundColor: null

    }).then(canvas => {

        const link = document.createElement("a");

        let fileName = dateInput.value.trim();

        if (fileName === "") {

            fileName = "header";

        }

        fileName = fileName.replace("-", ".");

        link.download =
            "header_" + fileName + ".png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});


// ================================
// 初期表示
// ================================

updateDate();

updateBadgeText();