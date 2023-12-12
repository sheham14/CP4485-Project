const $ = selector => document.querySelector(selector);

const compRock = "images/Comp-rock-removebg-preview.png"
const compPaper = "images/Comp-Paper-removebg-preview.png"
const compScissors = "images/Comp-Scissors-removebg-preview.png"
const compWin = "images/Comp-Winner-removebg-preview.png"
const compLose = "images/Comp-Loser-removebg-preview.png"

const playerRock = "images/Player-Rock-removebg-preview.png"
const playerPaper = "images/Player-Paper-removebg-preview.png"
const playerScissors = "images/Player-Scissors-removebg-preview.png"
const playerWin = "images/Player-Winner-removebg-preview.png"
const playerLose = "images/Player-Loser-removebg-preview.png"

const compArray = [compRock, compPaper, compScissors];
const playerArray = [playerRock, playerPaper, playerScissors];

const playerImg = document.getElementById("playerImg");
const compImg = document.getElementById("compImg");
 var playerName;
 var playerScore;

function startGame(){

    document.getElementById("startBtn").addEventListener("click", function(){

        playerName = document.getElementById("pname").value;
        document.getElementById("mainGameScreen").style.visibility = "visible";
        document.getElementById("titleScreen").style.visibility = "hidden";
        console.log(playerName)
    })
}



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

function saveScore() {
    const scoreData = {
      playerName: playerName,
      score: playerScore,
      timestamp: new Date().toISOString(),
    };
  
    fetch('http://localhost:3000/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(scoreData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Score saved successfully:', data);
    })
    .catch(error => {
      console.error('Error saving score:', error);
    });
  }

let i = 0
function checkWinner(){
    
    const playerFileName = getFileName(document.getElementById("playerImg").src);
    const compFileName = getFileName(document.getElementById("compImg").src);

    // console.log("playerFileName:", playerFileName);
    // console.log("compFileName:", compFileName);

    if (
        (playerFileName === getFileName(playerRock) && compFileName === getFileName(compArray[0])) ||
        (playerFileName === getFileName(playerPaper) && compFileName === getFileName(compArray[1])) ||
        (playerFileName === getFileName(playerScissors) && compFileName === getFileName(compArray[2]))
    ) {
        document.getElementById("result").innerHTML = "<h2>DRAW</h2>";

    } else if((playerFileName === getFileName(playerRock) && compFileName === getFileName(compArray[2])) ||
            (playerFileName === getFileName(playerPaper) && compFileName === getFileName(compArray[0])) ||
            (playerFileName === getFileName(playerScissors) && compFileName === getFileName(compArray[1]))
            ) {
                document.getElementById("result").innerHTML = "<h2>YOU WIN!</h2>";
                i += 1;
                document.getElementById("playerScore").innerHTML = i;

    } else if((playerFileName === getFileName(playerRock) && compFileName === getFileName(compArray[1])) ||
            (playerFileName === getFileName(playerPaper) && compFileName === getFileName(compArray[2])) ||
            (playerFileName === getFileName(playerScissors) && compFileName === getFileName(compArray[0])))
            {
                document.getElementById("result").innerHTML = "<h2>YOU LOSE!</h2>";
                playerScore = i;
                console.log(playerScore)
                saveScore(playerName, playerScore);
                i = 0;
                document.getElementById("playerScore").innerHTML = i
            }

}

function getFileName(src) {
    return src.split("/").pop().split("-")[1];
}


document.addEventListener("DOMContentLoaded", function(){
    playerMoveRock();
    playerMovePaper();
    playerMoveScissors();
    startGame();
    
})



