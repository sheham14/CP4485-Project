const $ = selector => document.querySelector(selector);

const compRock = "Comp-rock-removebg-preview.png"
const compPaper = "Comp-Paper-removebg-preview.png"
const compScissors = "Comp-Scissors-removebg-preview.png"
const compWin = "Comp-Winner-removebg-preview.png"
const compLose = "Comp-Loser-removebg-preview.png"

const playerRock = "Player-Rock-removebg-preview.png"
const playerPaper = "Player-Paper-removebg-preview.png"
const playerScissors = "Player-Scissors-removebg-preview.png"
const playerWin = "Player-Winner-removebg-preview.png"
const playerLose = "Player-Loser-removebg-preview.png"

const compArray = [compRock, compPaper, compScissors];
const playerArray = [playerRock, playerPaper, playerScissors];

function playerMoveRock(){
    document.getElementById("rockBtn").addEventListener("click", function{

        document.getElementById("playerImg").setAttribute(src, playerRock)

    })
}

document.addEventListener("DOMContentLoaded", function(){
    playerMoveRock();
})

