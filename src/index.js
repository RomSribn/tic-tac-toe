import "./style.css";

const $gameBord = document.getElementById("game");
const $gameCells = $gameBord.children;

console.log($gameCells);

for(let i = 0; i < $gameCells.length; i ++){
    $gameCells[i].addEventListener("click", handleClick)
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
