/*--- Set-up and Initialization---*/

//Define required constants

let playerOneBoard = [];
let playerTwoBoard = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let turn = 1;
let draggedShip;
let angle = 0;
let shipOptions = [];
const shipSizes = {
  "p1-carrier-png": 5,
  "p1-cruiser-png": 4,
  "p1-submarine-1-png": 3,
  "p1-submarine-2-png": 3,
  "p1-floater-png": 2,
  "p2-carrier-png": 5,
  "p2-cruiser-png": 4,
  "p2-submarine-1-png": 3,
  "p2-submarine-2-png": 3,
  "p2-floater-png": 2,
}

//Cache required elements

const newGameNavButton = document.getElementById("new-game-nav-button");
const howToPlayButton = document.getElementById("how-to-play-nav-button");
const startNewGameButton = document.getElementById("start-new-game-button");
const siteNameButton = document.getElementById("site-name-button");
const startButtonHolderEl = document.getElementById("start-button-holder");
const messageEl = document.getElementById("message");
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
const rotateButtons = Array.from(document.getElementsByClassName("rotate-button"));
const doneSettingShipsButtons = Array.from(document.getElementsByClassName("done-setting-ships-button"));

//Set up necessary event listeners

newGameNavButton.addEventListener("click",startNewGame);
startNewGameButton.addEventListener("click",startNewGame);
howToPlayButton.addEventListener("click",openHowToPlay);
siteNameButton.addEventListener("click",init);
closeHowToWindowButton.addEventListener("click",closeHowTo);
rotateButtons.forEach((button) => button.addEventListener("click",rotateShips));
doneSettingShipsButtons.forEach((button) => button.addEventListener("click",checkShipsToSet));


for(let ship of shipEls) {
  ship.addEventListener("dragstart",function(e) {
  draggedShip = e.target;
  console.log(draggedShip);
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
    const shipSize = shipSizes[draggedShip.id];
    draggedShip.remove();
    if (angle === 0) {
      for (let i=0; i<shipSize;i++) {
        let idx = Number(square.id);
        playerOneBoard[idx + i] = 1;
        playerOneBoardEls[idx - 1 + i].classList.add('ship-location-background');
      }
    } else {
      for (let i=0; i<shipSize;i++) {
        let idx = Number(square.id);
        playerOneBoard[idx + (10*i)] = 1;
        playerOneBoardEls[idx - 1 + (10*i)].classList.add('ship-location-background');
      }
    }
    console.log(playerOneBoard);
  })
}

for(let square of playerTwoBoardEls) {
  square.addEventListener("drop",function(e) {
    const shipSize = shipSizes[draggedShip.id];
    draggedShip.remove();
    if (angle === 0) {
      for (let i=0; i<shipSize;i++) {
        let idx = Number(square.id);
        playerTwoBoard[idx + i] = 1;
        playerTwoBoardEls[idx - 100 - 1 + i].classList.add('ship-location-background');
      }
    } else {
      for (let i=0; i<shipSize;i++) {
        let idx = Number(square.id);
        playerTwoBoard[idx + (10*i)] = 1;
        playerTwoBoardEls[idx - 100 - 1 + (10*i)].classList.add('ship-location-background');
      }
    }
    console.log(playerTwoBoard);
  })
}

//Initialize the game upon load and begin game when "Start New Game" is clicked

init();

function init() {
  for(let i=0; i<playerOneBoardEls.length; i++) {
  playerOneBoard.push(0);
  playerTwoBoard.push(0);
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



//Allow user to rotate ship orientation 90 degrees before placing it on the board

function rotateShips() {
  //const shipOptions = Array.from(shipRepoOneEl.children);
  //angle = angle === 0 ? 90 : 0;
  //shipOptions.forEach(shipOption => shipOption.style.transform = `rotate(${angle}deg)`);
  if (turn===1) {
      shipOptions = Array.from(shipRepoOneEl.children);
      angle = angle === 0 ? 90 : 0;
      shipOptions.forEach(shipOption => shipOption.style.transform = `rotate(${angle}deg)`);
    if (angle === 90) {
      
      shipRepoOneEl.classList.remove("ship-repository-vertical");
      shipRepoOneEl.classList.add("ship-repository-horizontal");
    } else {
      shipRepoOneEl.classList.add("ship-repository-vertical");
      shipRepoOneEl.classList.remove("ship-repository-horizontal");
    }
  } else {
    shipOptions = Array.from(shipRepoTwoEl.children);
    angle = angle === 0 ? 90 : 0;
    shipOptions.forEach(shipOption => shipOption.style.transform = `rotate(${angle}deg)`);
    if (angle === 90) {
      shipRepoTwoEl.classList.remove("ship-repository-vertical");
      shipRepoTwoEl.classList.add("ship-repository-horizontal");
    } else {
      shipRepoTwoEl.classList.add("ship-repository-vertical");
      shipRepoTwoEl.classList.remove("ship-repository-horizontal");
    }
  }
}

function checkShipsToSet() {
  if(turn===1){
    if(shipRepoOneEl.innerHTML.trim() === "") {
      changeTurn();
      angle = 0;
      shipSetUp();
    } else {
      messageEl.textContent = "Place all ships on the board before proceeding."
      clearMessageAfter5s();
    }
  } else {
    if(shipRepoTwoEl.innerHTML.trim() === "") {
      changeTurn();
      startGuessing();
    } else {
      messageEl.textContent = "Place all ships on the board before proceeding."
      clearMessageAfter5s();
    }
  }
}

function clearMessageAfter5s() {
  setTimeout(() => {
    messageEl.textContent = "";
  }, 5000);
}

//Load a question and four possible answers into the trivia window

//Validate if the user selected the correct answer to the trivia question

//Display the correct answer after user selection

//Accept user input when a guess is made of opponent's battleship location

function startGuessing() {
  for (let square of playerOneBoardEls) {
    square.classList.remove("ship-location-background")
  }
  for (let square of playerTwoBoardEls) {
    square.classList.remove("ship-location-background")
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

/*
function makeBoard(playerBoard) {
  const newBoard = document.createElement("div");
  newBoard.classList.add('board');
  newBoard.id = player;

  for (let i=0; i < 132; i++) {
    const square = document.createElement("div");
    square.classList.add("square1");
    square.id = i;
    newBoard.append(square)
  }
}
*/