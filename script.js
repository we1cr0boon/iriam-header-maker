alert("script.js開始");

window.addEventListener("DOMContentLoaded", async () => {

    alert("DOM読み込みOK");

    try {

        alert("fetch開始");

        const response = await fetch("assets/list.json");

        alert("response OK");

        const config = await response.json();

        alert("json OK");

        alert(config.characters.length);

    } catch (e) {

        alert("エラー");

        alert(e);

    }

});
