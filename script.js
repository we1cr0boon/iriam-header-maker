/* ==========================================
   IRIAM Header Maker Ver2
========================================== */

"use strict";

/* ===========================
   グローバル
=========================== */

let config = {};
let currentCharacter = null;

/* ===========================
   DOM取得
=========================== */

const characterList = document.getElementById("characterList");

const characterImage = document.getElementById("characterImage");
const backgroundImage = document.getElementById("backgroundImage");
const overlayImage = document.getElementById("overlayImage");

const saveButton = document.getElementById("saveButton");

const dateInput = document.getElementById("dateInput");

const dateText = document.getElementById("dateText");
const badgeText = document.getElementById("badgeText");

const firstCheck = document.getElementById("firstCheck");
const continueCheck = document.getElementById("continueCheck");

const continueCount = document.getElementById("continueCount");

const timesCheck = document.getElementById("timesCheck");
const timesCount = document.getElementById("timesCount");

/* ===========================
   初期化
=========================== */

window.addEventListener("DOMContentLoaded", init);

async function init(){

    await loadConfig();

    buildCharacterList();

    bindEvents();

    updatePreview();

}

/* ===========================
   list.json読込
=========================== */

async function loadConfig(){

    try{

        const res = await fetch("assets/list.json");

        if(!res.ok){

            throw new Error("list.json 読み込み失敗");

        }

        config = await res.json();

    }

    catch(err){

        console.error(err);

        alert("list.jsonを読み込めませんでした");

    }

}

/* ===========================
   キャラクター一覧
=========================== */

function buildCharacterList(){

    characterList.innerHTML = "";

    config.characters.forEach((item,index)=>{

        const button = document.createElement("button");

        button.className = "character-card";

        button.dataset.index = index;

        const img = document.createElement("img");

        img.src = "assets/character/" + item.file;

        img.alt = item.name;

        button.appendChild(img);

        button.addEventListener("click",()=>{

            selectCharacter(index);

        });

        characterList.appendChild(button);

    });

    selectCharacter(0);

}

/* ===========================
   キャラクター切替
=========================== */

function selectCharacter(index){

    currentCharacter = config.characters[index];

    characterImage.src =
        "assets/character/" + currentCharacter.file;

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
   イベント登録
=========================== */

function bindEvents(){

    dateInput.addEventListener("input", updatePreview);

    firstCheck.addEventListener("change", () => {

        if(firstCheck.checked){

            continueCheck.checked = false;

        }

        updatePreview();

    });

    continueCheck.addEventListener("change", () => {

        if(continueCheck.checked){

            firstCheck.checked = false;

        }

        updatePreview();

    });

    continueCount.addEventListener("input", updatePreview);

    timesCheck.addEventListener("change", updatePreview);

    timesCount.addEventListener("input", updatePreview);

}


/* ===========================
   プレビュー更新
=========================== */

function updatePreview(){

    updateDate();

    updateBadge();

}


/* ===========================
   日付
=========================== */

function updateDate(){

    if(!dateInput.value){

        return;

    }

    const date = new Date(dateInput.value);

    const year = date.getFullYear();

    const month =
        String(date.getMonth()+1).padStart(2,"0");

    dateText.textContent =
        `${year}.${month}`;

}


/* ===========================
   バッジ
=========================== */

function updateBadge(){
    badgeText.style.background = "red";

    let text = "";

    if(firstCheck.checked){

        text = "初めて";

    }

    else if(continueCheck.checked){

        text =
            `${continueCount.value}ヶ月連続`;

    }

    if(timesCheck.checked){

        text +=
            `${timesCount.value}回目`;

    }

    if(text===""){

        badgeText.innerHTML =
`いつもありがとう！<br>これからもよろしくね！`;

    }

    else{

        badgeText.textContent = text;

    }

}
