/* ==========================
   要素取得
========================== */

const characterButtons =
document.querySelectorAll(".character-btn");

const characterImage =
document.getElementById("characterImage");

const dateInput =
document.getElementById("dateInput");

const dateText =
document.getElementById("dateText");

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

const badgeText =
document.getElementById("badgeText");

const downloadBtn =
document.getElementById("downloadBtn");

const preview =
document.getElementById("preview");


/* ==========================
   キャラクター変更
========================== */

characterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        characterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        characterImage.src =
        button.dataset.image;

    });

});


/* ==========================
   日付表示
========================== */

function updateDate(){

    if(dateInput.value===""){

        dateText.textContent="";

        return;

    }

    dateText.textContent =
    dateInput.value.replace("-",".");

}

dateInput.addEventListener(

    "change",

    updateDate

);


/* ==========================
   バッジ文
========================== */

function updateBadge(){

    if(firstCheck.checked){

        badgeText.innerHTML="初めて";

        return;

    }

    let text="";

    if(continuousCheck.checked){

        text +=

        continuousValue.value +

        "ヶ月連続";

    }

    if(countCheck.checked){

        text +=

        countValue.value +

        "回目";

    }

    if(text===""){

        badgeText.innerHTML=

        "いつもありがとう！<br>これからもよろしくね！";

    }

    else{

        badgeText.innerHTML=text;

    }

}/* ==========================
   イベント登録
========================== */

firstCheck.addEventListener(
    "change",
    updateBadge
);

continuousCheck.addEventListener(
    "change",
    updateBadge
);

countCheck.addEventListener(
    "change",
    updateBadge
);

continuousValue.addEventListener(
    "input",
    updateBadge
);

countValue.addEventListener(
    "input",
    updateBadge
);


/* ==========================
   PNG保存
========================== */

downloadBtn.addEventListener("click", () => {

    html2canvas(preview, {

        scale: 2,

        useCORS: true,

        backgroundColor: null

    }).then(canvas => {

        const link = document.createElement("a");

        let fileName = dateText.textContent;

        if (fileName === "") {

            fileName = "header";

        }

        link.download =
            "IRIAM_Header_" + fileName + ".png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();

    });

});


/* ==========================
   初期表示
========================== */

updateDate();

updateBadge();
