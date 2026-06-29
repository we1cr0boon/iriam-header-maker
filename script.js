/* ==========================================
   IRIAM Header Maker Ver2
   script.js
========================================== */

let config = null;
let currentCharacter = null;

/* ===========================
   要素取得
=========================== */

const characterList = document.getElementById("characterList");
const characterImage = document.getElementById("characterImage");

/* ===========================
   初期化
=========================== */

window.addEventListener("DOMContentLoaded", init);

async function init() {

    try {

        const response = await fetch("assets/list.json");

        if (!response.ok) {
            throw new Error("list.json を読み込めません");
        }

        config = await response.json();

        createCharacterList();

    } catch (error) {

        console.error(error);
        alert("設定ファイルの読み込みに失敗しました。");

    }

}

/* ===========================
   キャラクター一覧生成
=========================== */

function createCharacterList() {

    characterList.innerHTML = "";

    config.characters.forEach((character, index) => {

        const button = document.createElement("button");

        button.className = "character-card";

        button.dataset.index = index;

        const img = document.createElement("img");

        img.src = "assets/character/" + character.file;
        img.alt = character.name;

        button.appendChild(img);

        button.addEventListener("click", () => {

            selectCharacter(index);

        });

        characterList.appendChild(button);

    });

    selectCharacter(0);

}

/* ===========================
   キャラクター切替
=========================== */

function selectCharacter(index) {

    currentCharacter = config.characters[index];

    characterImage.src =
        "assets/character/" + currentCharacter.file;

    document
        .querySelectorAll(".character-card")
        .forEach(card => card.classList.remove("active"));

    document
        .querySelector(`.character-card[data-index="${index}"]`)
        ?.classList.add("active");

}
