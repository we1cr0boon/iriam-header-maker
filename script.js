// =======================================
// IRIAM Header Maker
// Part1
// キャラクター一覧だけ作る
// =======================================

window.addEventListener("DOMContentLoaded", init);

async function init() {

    console.log("開始");

    try {

        const response = await fetch("assets/list.json");

        const config = await response.json();

        console.log(config);

        createCharacterList(config);

    } catch (e) {

        console.error(e);

        alert("list.json が読み込めません");

    }

}

function createCharacterList(config) {

    const list = document.getElementById("characterList");

    if (!list) {

        alert("characterList が見つかりません");

        return;

    }

    list.innerHTML = "";

    config.characters.forEach((item) => {

        const button = document.createElement("button");

        button.className = "character-card";

        const image = document.createElement("img");

        image.src =
            "assets/character/" + item.file;

        image.alt = item.name;

        button.appendChild(image);

        list.appendChild(button);

    });

}
