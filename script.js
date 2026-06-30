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

async function init() {
console.log("init開始");
    try {

        const response = await fetch("assets/list.json");

        if (!response.ok) {
            throw new Error("list.json を読み込めません");
        }

        config = await response.json();

        createCharacterList();
console.log("list読込成功");
        // ↓↓↓ここを追加
        initUI();
       console.log("initUI");
        updateTexts(
           badgeText.innerHTML = "テスト";
        );
       console.log("updateTexts");
        saveButton.addEventListener("click", saveImage);

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

}/* ===========================
   UI初期化
=========================== */

function initUI(){

    dateInput.addEventListener("input",updateTexts);

    firstCheck.addEventListener("change",()=>{

        if(firstCheck.checked){

            continueCheck.checked=false;

        }

        updateTexts();

    });

    continueCheck.addEventListener("change",()=>{

        if(continueCheck.checked){

            firstCheck.checked=false;

        }

        updateTexts();

    });

    continueCount.addEventListener("input",updateTexts);

    timesCheck.addEventListener("change",updateTexts);

    timesCount.addEventListener("input",updateTexts);

}


/* ===========================
   テキスト更新
=========================== */

function updateTexts(){

    //----------------------
    // 日付
    //----------------------

    if(dateInput.value){

        const date=new Date(dateInput.value);

        const y=date.getFullYear();

        const m=String(date.getMonth()+1).padStart(2,"0");

        dateText.textContent=`${y}.${m}`;

    }

    //----------------------
    // バッジ文章
    //----------------------

    let text="";

    if(firstCheck.checked){

        text+="初めて";

    }

    if(continueCheck.checked){

        text+=continueCount.value+"ヶ月連続";

    }

    if(timesCheck.checked){

        if(text!==""){

            text+="";

        }

        text+=timesCount.value+"回目";

    }

    if(text===""){

        text="いつもありがとう！\nこれからもよろしくね！";

    }

    badgeText.innerHTML=text.replace(/\n/g,"<br>");

}
/* ===========================
   画像読込
=========================== */

function loadImage(src){

    return new Promise((resolve,reject)=>{

        const img=new Image();

        img.onload=()=>resolve(img);

        img.onerror=reject;

        img.src=src;

    });

}


/* ===========================
   PNG保存
=========================== */

async function saveImage(){

    document.body.style.background = "red";

}
