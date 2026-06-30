/* ==========================================
   IRIAM Header Maker Ver2
   Part1
========================================== */

"use strict";

/* ===========================
   グローバル
=========================== */

let config = {};
let currentCharacter = null;

/* ===========================
   DOM
=========================== */

const characterList = document.getElementById("characterList");

const backgroundImage =
document.getElementById("backgroundImage");

const characterImage =
document.getElementById("characterImage");

const overlayImage =
document.getElementById("overlayImage");

const dateText =
document.getElementById("dateText");

const badgeText =
document.getElementById("badgeText");

const dateInput =
document.getElementById("dateInput");

const firstCheck =
document.getElementById("firstCheck");

const continueCheck =
document.getElementById("continueCheck");

const continueCount =
document.getElementById("continueCount");

const timesCheck =
document.getElementById("timesCheck");

const timesCount =
document.getElementById("timesCount");

const saveButton =
document.getElementById("saveButton");

/* ===========================
   初期化
=========================== */

window.addEventListener(
    "DOMContentLoaded",
    init
);

async function init(){

    await loadConfig();

    createCharacterList();

    registerEvents();

    updatePreview();

}

/* ===========================
   list.json
=========================== */

async function loadConfig(){

    const res = await fetch("assets/list.json");

    if(!res.ok){

        alert("list.jsonが読み込めません");

        return;

    }

    config = await res.json();

    backgroundImage.src =
        "assets/background/" +
        config.background;

    overlayImage.src =
        "assets/overlay/" +
        config.overlay;

}

/* ===========================
   キャラクター一覧
=========================== */

function createCharacterList(){

    characterList.innerHTML = "";

    config.characters.forEach((item,index)=>{

        const button =
        document.createElement("button");

        button.className =
        "character-card";

        button.dataset.index =
        index;

        const img =
        document.createElement("img");

        img.src =
        "assets/character/" +
        item.file;

        img.alt =
        item.name;

        button.appendChild(img);

        button.onclick = ()=>{

            selectCharacter(index);

        };

        characterList.appendChild(button);

    });

    if(config.characters.length){

        selectCharacter(0);

    }

}

/* ===========================
   キャラ変更
=========================== */

function selectCharacter(index){

    currentCharacter =
    config.characters[index];

    characterImage.src =
    "assets/character/" +
    currentCharacter.file;

    document
    .querySelectorAll(".character-card")
    .forEach(card=>{

        card.classList.remove("active");

    });

    document
    .querySelector(
        `.character-card[data-index="${index}"]`
    )
    .classList.add("active");

    updatePreview();

}

/* ===========================
   イベント
=========================== */

function registerEvents(){

    dateInput.addEventListener(
        "input",
        updatePreview
    );

    firstCheck.addEventListener(
        "change",
        updatePreview
    );

    continueCheck.addEventListener(
        "change",
        updatePreview
    );

    continueCount.addEventListener(
        "input",
        updatePreview
    );

    timesCheck.addEventListener(
        "change",
        updatePreview
    );

    timesCount.addEventListener(
        "input",
        updatePreview
    );

    saveButton.addEventListener(
        "click",
        savePNG
    );

}

/* ===========================
   プレビュー更新
=========================== */

function updatePreview(){

    updateDate();

    updateBadge();

}
/* ==========================================
   Part2
   日付・バッジ・プレビュー
========================================== */

/* ===========================
   日付更新
=========================== */

function updateDate(){

    if(dateInput.value){

        const [year,month] = dateInput.value.split("-");

        dateText.textContent =
        `${year}.${month}`;

    }

    else{

        const today = new Date();

        const year = today.getFullYear();

        const month =
        String(today.getMonth()+1)
        .padStart(2,"0");

        dateText.textContent =
        `${year}.${month}`;

    }

}

/* ===========================
   バッジ更新
=========================== */

function updateBadge(){

    let text = "";

    if(firstCheck.checked){

        continueCheck.checked = false;

        text = "初めて";

    }

    else{

        if(continueCheck.checked){

            text =
            `${continueCount.value}ヶ月連続`;

        }

        if(timesCheck.checked){

            text +=
            `${timesCount.value}回目`;

        }

    }

    if(text===""){

        badgeText.innerHTML =
        "いつもありがとう！<br>これからもよろしくね！";

    }

    else{

        badgeText.textContent = text;

    }

}

/* ===========================
   共通イベント
=========================== */

firstCheck.addEventListener("change",()=>{

    if(firstCheck.checked){

        continueCheck.checked = false;

    }

    updateBadge();

});

continueCheck.addEventListener("change",()=>{

    if(continueCheck.checked){

        firstCheck.checked = false;

    }

    updateBadge();

});

timesCheck.addEventListener("change",()=>{

    updateBadge();

});

continueCount.addEventListener("input",()=>{

    updateBadge();

});

timesCount.addEventListener("input",()=>{

    updateBadge();

});

/* ===========================
   初期表示
=========================== */

updatePreview();
