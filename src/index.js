import "./style.css";
import "./spinner.css";

const $gameBord = document.getElementById("game");
const $gameCells = $gameBord.children;
const $spinner = document.querySelector(".spin");
const startBtn = document.getElementById("reset-game");

const host = "https://ttt-practice.azurewebsites.net/";
const headers = new Headers();
headers.append("Content-type", "aplication/json");

let id;
console.log($gameCells);

for(let i = 0; i < $gameCells.length; i ++){
    $gameCells[i].addEventListener("click", handleClick)
}
startBtn.addEventListener("click", startNewGame);

function initializingGame(name) {
    return fetch(host + "start" + `?name=${name}`).then(response => {
        if(response.ok){
            return response.json();
        }
    })
}

function startNewGame(evt) {
    const target = evt.target;
    target.hidden = true;
     initializingGame("vasya").then(json => {
         if(json.ok){
             $spinner.hidden = true;
             target.hidden = false;
             id = json.data.id;
             console.log(id)
         }
     });

}

function handleClick(evt) {
    const target = evt.target;
    if(!target.innerHTML){
        if(target.nodeName === "LI"){
            target.classList.add("x");
            target.innerText = "x"
        }
    }
}
