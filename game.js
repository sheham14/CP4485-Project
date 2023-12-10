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

const playerImg = document.getElementById("playerImg");
const compImg = document.getElementById("compImg");

function playerMoveRock(){
    document.getElementById("rockBtn").addEventListener("click", function(){

        document.getElementById("playerImg").src = playerRock;
        document.getElementById("compImg").src = compArray[compRandomMove()];
        checkWinner();
    })
}

function playerMovePaper(){
    document.getElementById("paperBtn").addEventListener("click", function(){

        document.getElementById("playerImg").src = playerPaper;
        document.getElementById("compImg").src = compArray[compRandomMove()];
        checkWinner();
    })
}

function playerMoveScissors(){
    document.getElementById("scissorsBtn").addEventListener("click", function(){

        document.getElementById("playerImg").src = playerScissors;
        document.getElementById("compImg").src = compArray[compRandomMove()];
        checkWinner();
    })
}

function compRandomMove(){
   return Math.floor(Math.random() * 3)
}

let i = 0
function checkWinner(){
    
    const playerFileName = getFileName(document.getElementById("playerImg").src);
    const compFileName = getFileName(document.getElementById("compImg").src);

    console.log("playerFileName:", playerFileName);
    console.log("compFileName:", compFileName);

    if (
        (playerFileName === getFileName(playerRock) && compFileName === getFileName(compArray[0])) ||
        (playerFileName === getFileName(playerPaper) && compFileName === getFileName(compArray[1])) ||
        (playerFileName === getFileName(playerScissors) && compFileName === getFileName(compArray[2]))
    ) {
        document.getElementById("result").innerHTML = "<h1 class='gameTxt'>DRAW</h1>";

    } else if((playerFileName === getFileName(playerRock) && compFileName === getFileName(compArray[2])) ||
            (playerFileName === getFileName(playerPaper) && compFileName === getFileName(compArray[0])) ||
            (playerFileName === getFileName(playerScissors) && compFileName === getFileName(compArray[1]))
            ) {
                document.getElementById("result").innerHTML = "<h1 class='gameTxt'>YOU WON!</h1>";
                i += 1;
                document.getElementById("playerScore").innerHTML = i;

    } else if((playerFileName === getFileName(playerRock) && compFileName === getFileName(compArray[1])) ||
            (playerFileName === getFileName(playerPaper) && compFileName === getFileName(compArray[2])) ||
            (playerFileName === getFileName(playerScissors) && compFileName === getFileName(compArray[0])))
            {
                document.getElementById("result").innerHTML = "<h1 class='gameTxt'>YOU LOSE!</h1>";
                i = 0
            }

}

function getFileName(src) {
    return src.split("/").pop().split("-")[1];
}


document.addEventListener("DOMContentLoaded", function(){
    playerMoveRock();
    playerMovePaper();
    playerMoveScissors();
})



