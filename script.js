// =====================================
// IRIAM Header Maker
// script.js Part1
// =====================================

let config;

// ----------------------------
// 要素取得
// ----------------------------

const characterList = document.getElementById("characterList");
const characterImage = document.getElementById("characterImage");
const backgroundImage = document.getElementById("backgroundImage");
const overlayImage = document.getElementById("overlayImage");

// ----------------------------
// 初期化
// ----------------------------

async function init() {

    const response = await fetch("assets/list.json");
    config = await response.json();

    loadImages();
    createCharacterList();

}

// ----------------------------
// 固定画像
// ----------------------------

function loadImages() {

    backgroundImage.src =
        "assets/background/" + config.background;

    overlayImage.src =
        "assets/overlay/" + config.overlay;

}

// ----------------------------
// キャラクター一覧生成
// ----------------------------

function createCharacterList() {

    characterList.innerHTML = "";

    config.characters.forEach((item, index) => {

        const button = document.createElement("button");

        button.className = "character-card";

        if (index === 0) {
            button.classList.add("active");
        }

        const img = document.createElement("img");

        img.src =
            "assets/character/" + item.file;

        img.alt = item.name;

        button.appendChild(img);

        button.onclick = () => {

            selectCharacter(item.file);

            document
                .querySelectorAll(".character-card")
                .forEach(card => card.classList.remove("active"));

            button.classList.add("active");

        };

        characterList.appendChild(button);

    });

    // 初期表示
    selectCharacter(config.characters[0].file);

}

// ----------------------------
// キャラクター変更
// ----------------------------

function selectCharacter(file) {

    characterImage.src =
        "assets/character/" + file;

}

// ----------------------------
// 起動
// ----------------------------

init();
