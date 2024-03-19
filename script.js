/*--- Set-up and Initialization---*/

//Cache required elements

const newGameNavButton = document.getElementById("new-game-nav-button");
const howToPlayButton = document.getElementById("how-to-play-nav-button");
const startNewGameButton = document.getElementById("start-new-game-button");
const siteNameButton = document.getElementById("site-name-button");
const startButtonHolderEl = document.getElementById("start-button-holder");
const howToPlayWindow = document.getElementById("how-to-play-window"); 
const closeHowToWindowButton = document.getElementById("close-how-to-window");
const playerOneBoardEls = document.getElementsByClassName("square1");
const playerTwoBoardEls = document.getElementsByClassName("square2");
const playerOneBoardTotalEl = document.getElementById("board1");
const playerTwoBoardTotalEl = document.getElementById("board2");
const playerOneScoreEl = document.getElementById("player-1-score-name");
const playerTwoScoreEl = document.getElementById("player-2-score-name");
const shipSectionOneEl = document.getElementById("ship-section-1");
const shipSectionTwoEl = document.getElementById("ship-section-2");
const shipRepoOneEl = document.getElementById("ship-repository-1");
const shipRepoTwoEl = document.getElementById("ship-repository-2");
const shipEls = document.getElementsByClassName("ship");

//Set up necessary event listeners

newGameNavButton.addEventListener("click",startNewGame);
startNewGameButton.addEventListener("click",startNewGame);
howToPlayButton.addEventListener("click",openHowToPlay);
siteNameButton.addEventListener("click",init);
closeHowToWindowButton.addEventListener("click",closeHowTo);

for(let ship of shipEls) {
  ship.addEventListener("dragstart",function(e) {
  draggedShip = e.target;
  checkShipsToSet();
})}

for(let square of playerOneBoardEls) {
  square.addEventListener("dragover",function(e) {
    e.preventDefault();
  })
}

for(let square of playerTwoBoardEls) {
  square.addEventListener("dragover",function(e) {
    e.preventDefault();
  })
}


for(let square of playerOneBoardEls) {
  square.addEventListener("drop",function(e) {
    square.prepend(draggedShip);
    square.classList.add('no-background');
    console.log(draggedShip.length);
    for (let i=0; i<draggedShip.length;i++) {
      console.log(draggedShip.length)
      //let idx = playerOneBoardEls.indexOf(square);
      //console.log(idx);
    }
    console.log(square);
    checkShipsToSet();
    shipSetUp();
  })
}

for(let square of playerTwoBoardEls) {
  square.addEventListener("drop",function(e) {
    square.prepend(draggedShip);
    square.classList.add('no-background');
    console.log(draggedShip.length);
    for (let i=0; i<draggedShip.length;i++) {
      console.log(draggedShip.length)
      //let idx = playerOneBoardEls.indexOf(square);
      //console.log(idx);
    }
    console.log(square);
    checkShipsToSet();
    if (turn ===1) {
      startGuessing();
    }
  })
}


//Define required constants

let playerOneBoard = [];
let playerTwoBoard = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let turn;
let draggedShip;

//Initialize the game upon load and begin game when "Start New Game" is clicked

init();

function init() {
  for(let i=0; i<playerOneBoardEls.length; i++) {
  playerOneBoard.push(null);
  playerTwoBoard.push(null);
  }
  turn = 1;
  startButtonHolderEl.classList.add("start-button-holder-visible");
  startButtonHolderEl.classList.remove("start-button-holder-hidden");
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
  playerOneBoardTotalEl.classList.remove("board-hidden");
  playerTwoBoardTotalEl.classList.remove("board-hidden");
  shipSectionOneEl.classList.remove("ship-section-visible");
  shipSectionTwoEl.classList.remove("ship-section-visible");
  shipSectionOneEl.classList.add("ship-section-hidden");
  shipSectionTwoEl.classList.add("ship-section-hidden");
}

function startNewGame() {
  console.log(playerOneBoard);
  console.log(playerTwoBoard);
  startButtonHolderEl.classList.add("start-button-holder-hidden");
  startButtonHolderEl.classList.remove("start-button-holder-visible");
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
  shipSetUp();
}

//Create a pop-up with a how-to-play message when the how-to-play button is clicked

function openHowToPlay() {
  console.log("How to Play!");
  howToPlayWindow.classList.remove("how-to-play-window-hidden");
  howToPlayWindow.classList.add("how-to-play-window-visible");
}

function closeHowTo() {
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
}

//Render the screen at the conclusion of each turn

function render() {
  playerOneScoreEl = playerOneScore;
  playerTwoScoreEl = playerTwoScore;
}

//Visually update the board state

//Update the the text to show who's turn it is

//Define win conditions

/*--- Game Flow ---*/

//Accept user input to place ships on their respective boards

function shipSetUp() {
  if (turn === 1) {
    playerTwoBoardTotalEl.classList.add("board-hidden");
    shipSectionOneEl.classList.add("ship-section-visible");
    shipSectionOneEl.classList.remove("ship-section-hidden");
  } else {
    playerOneBoardTotalEl.classList.add("board-hidden");
    playerTwoBoardTotalEl.classList.remove("board-hidden");
    shipSectionTwoEl.classList.add("ship-section-visible");
    shipSectionTwoEl.classList.remove("ship-section-hidden");
    shipSectionOneEl.classList.remove("ship-section-visible");
    shipSectionOneEl.classList.add("ship-section-hidden");
  }
  //placeShip();
}

function checkShipsToSet() {
  if(turn===1){
    if(shipRepoOneEl.innerHTML.trim() === "") {
      changeTurn();
    }
  } else {
    if(shipRepoTwoEl.innerHTML.trim() === "") {
      changeTurn();
    }
  }
}

//function placeShip {

//}


//Load a question and four possible answers into the trivia window

//Validate if the user selected the correct answer to the trivia question

//Display the correct answer after user selection

//Accept user input when a guess is made of opponent's battleship location

function startGuessing() {
  for (let square of playerOneBoardEls) {
    square.innerHTML = "";
    square.classList.remove("no-background")
  }
  for (let square of playerTwoBoardEls) {
    square.innerHTML = "";
    square.classList.remove("no-background")
  }
  playerOneBoardTotalEl.classList.remove("board-hidden");
  shipSectionTwoEl.classList.remove("ship-section-visible");
  shipSectionTwoEl.classList.add("ship-section-hidden");
}

//Register a hit/miss after a player guesses an opponent's battleship location

//Display hit/miss message to the players

//Change player turn (either after trivia question is failed or guess is made of ship location)

function changeTurn(){
  turn *= -1;
}

//Evaluate if the win conditions have been met at the end of each turn

//Display winning message at the conclusion of the game

//Update the scoreboard at the conclusion of a match

//Abandon the match if both players click "New Game" (if 'Confirm New Game' is clicked as well)

