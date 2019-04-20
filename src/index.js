import "./style.css";
import "./spinner.css";

const mainContainer = document.querySelector(".container");
const $gameBord = document.getElementById("game");
console.log(+$gameBord.children[0].dataset.pos === 0);
const $spinner = document.querySelector(".spin");
const startBtn = document.getElementById("reset-game");

const score = {
    player1: document.getElementById("player-one-score"),
    player2: document.getElementById("player-two-score")
};
// console.log(Object.keys(score).includes("player3"));
let player1Score = 0;
let player2Score = 0;

const host = "https://ttt-practice.azurewebsites.net/";
const headers = new Headers();
headers.append("Content-type", "application/json");

let id;
let currentPosition;


startBtn.addEventListener("click", startNewGame);



function  initializingGame(name){
    return fetch(host + "start" + `?name=${name}`).then(response => {
        if(response.ok){
            return response.json();
        }
    })
}

function startNewGame(evt) {
    afterStartSets();
    const target = evt.target;
    // console.log();
      initializingGame("vasya")
          .then(json => {
         if(json.ok){
             id = json.data.id;
             console.log(json.data);
             console.log($gameBord);
             $spinner.classList.add("hidden");
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
            $spinner.classList.remove("hidden");
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
                    if(Object.keys(data).includes("win")){
                        $spinner.classList.add("hidden");
                        $gameBord.removeEventListener("click", handleClick);
                        if(data.win === 1){
                            player1Score += 1;
                        }
                        if(data.win === 2){
                            player1Score += 1;
                            player2Score += 1;
                        }
                    }
                    return waitMove();
                })
                .then(response => {
                    if(!response.ok) return;
                    return response.json()
                })
                .then(response => {
                    if(!response.ok) return;
                    console.log(response);
                    $spinner.classList.add("hidden");
                    botsMove(response.data.move);
                    if(response.data.win === 0){
                        player2Score += 1;
                    }
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

function afterStartSets() {
    $spinner.classList.remove("hidden");
    deletingCells($gameBord);
    generateBoardGame().forEach(el => $gameBord.appendChild(el));
    $gameBord.addEventListener("click", handleClick);
    $gameBord.style.opacity = 1;
    score.player1.innerText = player1Score;
    score.player2.innerText = player2Score;
}
