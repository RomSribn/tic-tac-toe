import "./style.css";
import "./spinner.css";

const mainContainer = document.querySelector(".container");
const $gameBord = document.getElementById("game");
console.log(+$gameBord.children[0].dataset.pos === 0);
const $spinner = document.querySelector(".spin");
const startBtn = document.getElementById("reset-game");

const host = "https://ttt-practice.azurewebsites.net/";
const headers = new Headers();
headers.append("Content-type", "application/json");

let id;
let currentPosition;

$gameBord.addEventListener("click", handleClick);
startBtn.addEventListener("click", startNewGame);



function  initializingGame(name){
    return fetch(host + "start" + `?name=${name}`).then(response => {
        $spinner.hidden = false;
        if(response.ok){
            return response.json();
        }
    })
}

function startNewGame(evt) {
    deletingCells($gameBord);
    generateBoardGame().forEach(el => $gameBord.appendChild(el));
    const target = evt.target;
    this.firstElementChild.hidden = true;

    // console.log();
      initializingGame("vasya")
          .then(json => {
         if(json.ok){
             $spinner.hidden = true;
             this.firstElementChild.hidden = false;
             id = json.data.id;
             console.log(json.data);
             console.log($gameBord);
             return json;
         }
     });

}

function makeMove(position) {
    return fetch(host + "makeMove",{
        method: "POST",
        body: JSON.stringify({move:+position, id:id, name:"vasya"}),
        headers: headers
    })

}

function handleClick(evt) {
    const target = evt.target;
    if(!target.innerHTML){
        if(target.nodeName === "LI"){
            target.classList.add("x");
            target.innerText = "x";
            currentPosition = target.dataset.pos;
            makeMove(currentPosition)
                .then(response => {
                    if(!response.ok) return;
                    console.log(response);
                    return response.json();
                })
                .then(response => {
                    if(!response.ok) return;
                    console.log(response);
                    return response.data;

                })
                .then(data => {
                    console.log(data);
                    return waitMove();
                })
                .then(response => {
                    if(!response.ok) return;
                    return response.json()
                })
                .then(response => {
                    if(!response.ok) return;
                    console.log(response);
                    botsMove(response.data.move)
                })


        }
    }
}
/*
data: {move: 4}
ok: true
*/
function botsMove(position) {
    const nodeArr = $gameBord.children;
    for(let i = 0; i < nodeArr.length; i ++){
        if(+nodeArr[i].dataset.pos === position){
            nodeArr[i].classList.add("o");
            nodeArr[i].innerText = "o"
        }
    }
}

function waitMove() {
    return fetch(host + "waitMove",{
        method: "POST",
        body: JSON.stringify({name:"vasya", id:id}),
        headers: headers
    })
}

function generateBoardGame(parent) {
    const cellArr = [];
    for(let i = 0; i < 9; i ++){
        const cell = document.createElement("li");
        cell.setAttribute("data-pos", i);
        cellArr.push(cell);
    }
    return cellArr;
}

function deletingCells(parent) {
    while(parent.firstChild){
        parent.firstChild.remove();
    }
}
