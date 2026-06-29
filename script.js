// =======================================
// IRIAM Header Maker
// Ver2
// キャラクター一覧＋切替
// =======================================

window.addEventListener("DOMContentLoaded", init);

let config;

async function init() {

    try {

        const response = await fetch("assets/list.json");
        config = await response.json();

        createCharacterList();

        // 初期キャラクター
        selectCharacter(config.characters[0].file);

    } catch (e) {

        console.error(e);
        alert("list.json の読み込みに失敗しました");

    }

}

function createCharacterList() {

    const list = document.getElementById("characterList");
    const preview = document.getElementById("characterImage");

    list.innerHTML = "";

    config.characters.forEach((item, index) => {

        const button = document.createElement("button");
        button.className = "character-card";

        if(index === 0){
            button.classList.add("active");
        }

        const image = document.createElement("img");
        image.src = "assets/character/" + item.file;
        image.alt = item.name;

        button.appendChild(image);

        button.addEventListener("click", () => {

            selectCharacter(item.file);

            document
                .querySelectorAll(".character-card")
                .forEach(card => card.classList.remove("active"));

            button.classList.add("active");

        });

        list.appendChild(button);

    });

}

function selectCharacter(file){

    const preview = document.getElementById("characterImage");

    preview.src = "assets/character/" + file;

}
