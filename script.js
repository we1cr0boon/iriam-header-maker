// ==========================================
// IRIAM Header Maker Ver2
// Part1 キャラクター機能
// ==========================================

let config;

// ----------------------
// 要素取得
// ----------------------

const characterList = document.getElementById("characterList");
const characterImage = document.getElementById("characterImage");

// ----------------------
// 初期化
// ----------------------

document.addEventListener("DOMContentLoaded", init);

async function init() {

    try {

        const response = await fetch("assets/list.json");

        config = await response.json();

        createCharacterButtons();

    } catch (error) {

        console.error(error);

        alert("list.json を読み込めませんでした");

    }

}

// ----------------------
// ボタン生成
// ----------------------

function createCharacterButtons() {

    characterList.innerHTML = "";

    config.characters.forEach((character, index) => {

        const button = document.createElement("button");

        button.className = "character-card";

        if (index === 0) {

            button.classList.add("active");

            changeCharacter(character.file);

        }

        const image = document.createElement("img");

        image.src =
            "assets/character/" + character.file;

        image.alt =
            character.name;

        button.appendChild(image);

        button.addEventListener("click", () => {

            changeCharacter(character.file);

            document
                .querySelectorAll(".character-card")
                .forEach(card => {

                    card.classList.remove("active");

                });

            button.classList.add("active");

        });

        characterList.appendChild(button);

    });

}

// ----------------------
// キャラクター変更
// ----------------------

function changeCharacter(file) {

    characterImage.src =
        "assets/character/" + file;

}
