/*--- Set-up and Initialization---*/

//Define required constants

let playerOneBoard = [];
let playerTwoBoard = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let winner = "";
let turn = 1;
let draggedShip;
let angle = 0;
let shipOptions = [];
let validStartSquare;
let playerOne = "Player 1";
let playerTwo = "Player 2";
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
const playerOneScoreEl = document.getElementById("player-1-score-number");
const playerTwoScoreEl = document.getElementById("player-2-score-number");
const shipSectionOneEl = document.getElementById("ship-section-1");
const shipSectionTwoEl = document.getElementById("ship-section-2");
const shipRepoOneEl = document.getElementById("ship-repository-1");
const shipRepoTwoEl = document.getElementById("ship-repository-2");
const shipEls = document.getElementsByClassName("ship");
const rotateButtons = Array.from(document.getElementsByClassName("rotate-button"));
const doneSettingShipsButtons = Array.from(document.getElementsByClassName("done-setting-ships-button"));
const carrierPNG = Array.from(document.getElementsByClassName("carrier-png"));
const cruiserPNG = Array.from(document.getElementsByClassName("cruiser-png"));
const submarinePNG = Array.from(document.getElementsByClassName("submarine-png"));
const floaterPNG = Array.from(document.getElementsByClassName("floater-png"));
const playerOneBoardTitle = document.getElementById("player-one-board-title");
const playerTwoBoardTitle = document.getElementById("player-two-board-title");
const battleshipAreaEl = document.getElementById("battleship-area");

//Set up necessary event listeners

newGameNavButton.addEventListener("click",startNewGame);
startNewGameButton.addEventListener("click",startNewGame);
howToPlayButton.addEventListener("click",openHowToPlay);
siteNameButton.addEventListener("click",init);
closeHowToWindowButton.addEventListener("click",closeHowTo);
rotateButtons.forEach((button) => button.addEventListener("click",rotateShips));
doneSettingShipsButtons.forEach((button) => button.addEventListener("click",checkShipsToSet));

class ShipIcons {
  constructor() {

  }
}
for(let ship of shipEls) {
  ship.addEventListener("dragstart",function(e) {
  draggedShip = e.target;
  })
}

for(let square of playerOneBoardEls) {
  square.addEventListener("dragover",function(e) {
    const shipSize = shipSizes[draggedShip.id];
    let idx = Number(square.id);
    let shipSquares = [];
    let overlap = [];
    let noOverlap;
    for (let i=0; i<shipSize;i++) {
      if (angle === 0)  {
        shipSquares.push(playerOneBoardEls[idx + i])
      } else {
        shipSquares.push(playerOneBoardEls[idx + (10 * i)])
      }
    } 
    for (let shipSquare of shipSquares) {
      if (playerOneBoard[Number(shipSquare.id)] === 1) {
        overlap.push(true);
      }
    }
    noOverlap = overlap.length === 0;
    overlap = [];
    if (angle === 0 && noOverlap) {
      if (10 - idx % 10 >= shipSize) {
        e.preventDefault();
        addPreview(shipSize,playerOneBoardEls,idx);
      }
    } else if (angle === 90 && noOverlap) {
      if (10 - (Math.floor(idx / 10)) >= shipSize) {
        e.preventDefault();
        addPreview(shipSize,playerOneBoardEls,idx);
      }
    }
  })
}

for(let square of playerTwoBoardEls) {
  square.addEventListener("dragover",function(e) {
    const shipSize = shipSizes[draggedShip.id];
    let idx = Number(square.id - 100);
    let shipSquares = [];
    let overlap = [];
    let noOverlap;
    for (let i=0; i<shipSize;i++) {
      if (angle === 0)  {
        shipSquares.push(playerTwoBoardEls[idx + i])
      } else {
        shipSquares.push(playerTwoBoardEls[idx + (10 * i)])
      }
    } 
    for (let shipSquare of shipSquares) {
      if (playerTwoBoard[Number(shipSquare.id)- 100] === 1) {
        overlap.push(true);
      }
    }
    noOverlap = overlap.length === 0;
    overlap = [];
    if (angle === 0 && noOverlap) {
      if (10 - idx % 10 >= shipSize) {
        e.preventDefault();
        addPreview(shipSize,playerTwoBoardEls,idx);
      }
    } else if (angle === 90 && noOverlap) {
      if (10 - (Math.floor(idx / 10)) >= shipSize) {
        e.preventDefault();
        addPreview(shipSize,playerTwoBoardEls,idx);
      }
    }
  })
}

for(let square of playerOneBoardEls) {
  square.addEventListener("dragleave",function(e) {
    removePreview();
  })
}

for(let square of playerTwoBoardEls) {
  square.addEventListener("dragleave",function(e) {
    removePreview();
  })
}

for(let square of playerOneBoardEls) {
  square.addEventListener("drop",function(e) {
    const shipSize = shipSizes[draggedShip.id];
    let idx = Number(square.id);
    for (let i=0; i<shipSize; i++) {
      if (angle === 0) {
        playerOneBoard[idx + i] = 1;
        playerOneBoardEls[idx + i].classList.add('ship-location-background');
      } else {
        playerOneBoard[idx + (10 * i)] = 1;
        playerOneBoardEls[idx + (10 * i)].classList.add('ship-location-background');
      }
    }
    draggedShip.remove();
    removePreview();
  })
}

for(let square of playerTwoBoardEls) {
  square.addEventListener("drop",function(e) {
    const shipSize = shipSizes[draggedShip.id];
    let idx = Number(square.id) - 100;
    if (angle === 0) {
      for (let i=0; i<shipSize;i++) {
        playerTwoBoard[idx + i] = 1;
        playerTwoBoardEls[idx + i].classList.add('ship-location-background');
      }
    } else {
      for (let i=0; i<shipSize;i++) {
        playerTwoBoard[idx + (10 * i)] = 1;
        playerTwoBoardEls[idx + (10 * i)].classList.add('ship-location-background');
      }
    }
    draggedShip.remove();
    removePreview();
  })
}

//Use 'r' as a hotkey for rotating ship repository

document.addEventListener("keydown",function(e) {
  if (e.key.toLowerCase() === "r") {
    rotateShips();
  }
})

//Initializes a fresh game state and begins a game when "Start New Game" is clicked

init();

function init() {
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
  playerOneBoardTitle.textContent = `${playerOne}'s Board`;
  playerTwoBoardTitle.textContent = `${playerTwo}'s Board`;
  messageEl.textContent = "";
  resetGame();
  turn = 1;
}

function startNewGame() {
  init();
  startButtonHolderEl.classList.add("start-button-holder-hidden");
  startButtonHolderEl.classList.remove("start-button-holder-visible");
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
  shipSetUp();
}

//Create a pop-up with a how-to-play message when the how-to-play button is clicked

function openHowToPlay() {
  howToPlayWindow.classList.remove("how-to-play-window-hidden");
  howToPlayWindow.classList.add("how-to-play-window-visible");
}

//Closes the how-to-play window when the close button is clicked

function closeHowTo() {
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
}

/*--- Game Flow ---*/

//Accept user input to place ships on their respective boards

function shipSetUp() {
  messageEl.textContent = `Drag ships onto your board to place them.`;
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
    renderRotatedShips();
  }
}

//Adds a visual effect to preview where a ship would be dropped while the user drags a ship over the board

function addPreview(size,board,index) {
  if (angle === 0) {
    for (let i=0; i<size; i++) {
      board[index + i].classList.add('preview');
    }
  } else {
    for (let i=0; i<size; i++) {
      board[index + (10 * i)].classList.add('preview');
    }
  }
}

//Removes squares visual preview effect when no longer dragging a ship over a square that was previewed

function removePreview() {
  const previewSquares = Array.from(document.getElementsByClassName('preview'));
  if (previewSquares.length > 0) {
    previewSquares.forEach((previewSquare) => previewSquare.classList.remove('preview'));
  }
}

//Allow user to rotate ship orientation 90 degrees before placing it on the board

function rotateShips() {
  if (turn===1) {
    shipOptions = Array.from(shipRepoOneEl.children);
    angle = angle === 0 ? 90 : 0;
    shipOptions.forEach(shipOption => shipOption.style.transform = `rotate(${angle}deg)`);
    renderRotatedShips();
  } else {
    shipOptions = Array.from(shipRepoTwoEl.children);
    angle = angle === 0 ? 90 : 0;
    shipOptions.forEach(shipOption => shipOption.style.transform = `rotate(${angle}deg)`);
    renderRotatedShips();
  }
}

//Changes the 

function renderRotatedShips() {
  if (angle === 90) {
    shipRepoOneEl.classList.remove("ship-repository-vertical");
    shipRepoOneEl.classList.add("ship-repository-horizontal");
    shipRepoTwoEl.classList.remove("ship-repository-vertical");
    shipRepoTwoEl.classList.add("ship-repository-horizontal");
    carrierPNG.forEach(carrier => carrier.style.margin = "10px -75px");
    cruiserPNG.forEach(cruiser => cruiser.style.margin = "10px -50px");
    submarinePNG.forEach(sub => sub.style.margin = "10px -35px");
    floaterPNG.forEach(floater => floater.style.margin = "10px -20px");
  } else {
    shipRepoOneEl.classList.add("ship-repository-vertical");
    shipRepoOneEl.classList.remove("ship-repository-horizontal");
    shipRepoTwoEl.classList.add("ship-repository-vertical");
    shipRepoTwoEl.classList.remove("ship-repository-horizontal");
    shipOptions.forEach(shipOption => shipOption.style.margin = "10px auto");
  }
}

function checkShipsToSet() {
  if (turn===1) {
    if (shipRepoOneEl.innerHTML.trim() === "") {
      changeTurn();
      angle = 0;
      shipOptions = Array.from(shipRepoTwoEl.children);
      shipOptions.forEach(shipOption => shipOption.style.margin = "10px auto");
      shipSetUp();
    } else {
      messageEl.textContent = "Place all ships on the board before proceeding."
      //clearMessageAfter5s();
    }
  } else {
    if (shipRepoTwoEl.innerHTML.trim() === "") {
      changeTurn();
      startGuessing();
    } else {
      messageEl.textContent = "Place all ships on the board before proceeding."
      //clearMessageAfter5s();
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
    square.classList.remove("ship-location-background");
    square.addEventListener("click", makeGuessPlayerTwo);
  }
  for (let square of playerTwoBoardEls) {
    square.classList.remove("ship-location-background");
    square.addEventListener("click", makeGuessPlayerOne);
  }
  playerOneBoardTotalEl.classList.remove("board-hidden");
  shipSectionTwoEl.classList.remove("ship-section-visible");
  shipSectionTwoEl.classList.add("ship-section-hidden");
}


//Register a hit/miss after a player guesses an opponent's battleship location, then calls a function to change the turn

function makeGuessPlayerOne(e) {
  let idx = Number(e.target.id - 100);
  if (turn === 1 && !winner) {
    if (playerTwoBoard[idx] === 1) {
      e.target.classList.add("hit");
      e.target.removeEventListener("click", makeGuessPlayerOne);
      playerTwoBoard[idx] = 0;
      checkForWin();
    } else {
      e.target.classList.add("miss");
      e.target.removeEventListener("click", makeGuessPlayerOne);
    }
    if (!winner) {
      changeTurn();
    }
  } else {
    messageEl.textContent = `${playerTwo} must guess a square on ${playerOne}'s board.`;
  }
}

function makeGuessPlayerTwo(e) {
  let idx = Number(e.target.id);
  if (turn === -1 && !winner) {
    if (playerOneBoard[idx] === 1) {
      e.target.classList.add("hit");
      e.target.removeEventListener("click", makeGuessPlayerTwo);
      playerOneBoard[idx] = 0;
      checkForWin();
    } else {
      e.target.classList.add("miss");
      e.target.removeEventListener("click", makeGuessPlayerTwo);
    }
    if (!winner) {
      changeTurn();
    }
  } else {
    messageEl.textContent = `${playerOne} must guess a square on ${playerTwo}'s board.`;
  }
}

//Display hit/miss message to the players

//Changes player turn and displays that it is the current players turn

function changeTurn() {
  turn *= -1;
  turn === 1 ? currentPlayer = playerOne : currentPlayer = playerTwo;
  messageEl.textContent = `It is ${currentPlayer}'s turn.`;
}

//Evaluate if the win conditions have been met at the end of each turn

function checkForWin() {
  let sum1 = playerOneBoard.reduce((prev,num) => {
    prev += num;
    return prev;
  },0)
  let sum2 = playerTwoBoard.reduce((prev,num) => {
    prev += num;
    return prev;
  },0)
  if (sum1 === 0) {
    winUpdate(playerTwo);
  }
  if (sum2 === 0) {
    winUpdate(playerOne);
  }
}

//Display winning message at the conclusion of the game and update the scoreboard in the nav bar

function winUpdate(winningPlayer) {
  winner = winningPlayer;
  if (winner === playerOne) {
    playerOneScore += 1;
    playerOneScoreEl.textContent = playerOneScore;
  } else {
    playerTwoScore += 1;
    playerTwoScoreEl.textContent = playerTwoScore;
  }
  messageEl.textContent = `${winner} wins!`;
  renderGameOverBoard()
}

//Disables further guesses once the game has ended and renders the boards with unguessed ship locations visibile

function renderGameOverBoard() {
  for (let square of playerOneBoardEls) {
    square.removeEventListener("click", makeGuessPlayerTwo);
    if (playerOneBoard[square.id] === 1) {
      square.classList.add("ship-location-background");
    }
  }
  for (let square of playerTwoBoardEls) {
    square.removeEventListener("click", makeGuessPlayerOne);
    if (playerTwoBoard[square.id - 100] === 1) {
      square.classList.add("ship-location-background");
    }
  }
  startButtonHolderEl.classList.add("start-button-holder-visible");
  startButtonHolderEl.classList.remove("start-button-holder-hidden");
}

//Resets board and variables to prepare for new game start

function resetGame() {
  for(let i=0; i<100; i++) {
    playerOneBoard[i] = 0;
    playerTwoBoard[i] = 0;
  }
  angle = 0;
  clearBoard(playerOneBoardEls) ;
  clearBoard(playerTwoBoardEls);
  removePreview();
}

//Clears the board visually

function clearBoard(board) {
  for (let square of board) {
    square.classList.remove("hit");
    square.classList.remove("miss");
    square.classList.remove("ship-location-background");
  }
}


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