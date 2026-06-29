/* ==========================================
   IRIAM Header Maker
   Version 2
========================================== */

/* ==========================================
   設定ファイル読込
========================================== */

let config = null;

/* ==========================================
   要素取得
========================================== */

const characterList =
document.getElementById("characterList");

const characterImage =
document.getElementById("characterImage");

const backgroundImage =
document.getElementById("backgroundImage");

const overlayImage =
document.getElementById("overlayImage");

const dateInput =
document.getElementById("dateInput");

const dateText =
document.getElementById("dateText");

const badgeText =
document.getElementById("badgeText");

const firstCheck =
document.getElementById("firstCheck");

const continuousCheck =
document.getElementById("continuousCheck");

const countCheck =
document.getElementById("countCheck");

const continuousValue =
document.getElementById("continuousValue");

const countValue =
document.getElementById("countValue");

const preview =
document.getElementById("preview");

const downloadBtn =
document.getElementById("downloadBtn");


/* ==========================================
   初期化
========================================== */

async function initialize(){

    const response =
    await fetch("assets/list.json");

    config =
    await response.json();

    loadImages();

    createCharacterList();

    updateDate();

    updateBadge();

}


/* ==========================================
   固定画像
========================================== */

function loadImages(){

    backgroundImage.src =
    "assets/background/" +
    config.background;

    overlayImage.src =
    "assets/overlay/" +
    config.overlay;

}


/* ==========================================
   キャラクター一覧
========================================== */

function createCharacterList(){

    characterList.innerHTML = "";

    config.characters.forEach(

        (character,index)=>{

            const card =
            document.createElement("div");

            card.className =
            "character-card";

            if(index===0){

                card.classList.add("active");

            }

            const image =
            document.createElement("img");

            image.src =
            "assets/character/" +
            character.file;

            image.alt =
            character.name;

            card.appendChild(image);

            card.addEventListener(

                "click",

                ()=>{

                    selectCharacter(

                        character.file,

                        card

                    );

                }

            );

            characterList.appendChild(card);

        }

    );

}


/* ==========================================
   キャラクター変更
========================================== */

function selectCharacter(

    file,

    card

){

    characterImage.src =
    "assets/character/" +
    file;

    document
    .querySelectorAll(".character-card")
    .forEach(

        item=>{

            item.classList.remove("active");

        }

    );

    card.classList.add("active");

}
