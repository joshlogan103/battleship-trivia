/*--- Defining Constants and Caching Elements---*/

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
let playerOne = "Player 1";
let playerTwo = "Player 2";
let currentPlayer;
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
import trivia from "./trivia.json" assert {type : "json"};
let triviaQuestion;
let triviaOptions = [];
let triviaAnswer;

//Cache required elements

const newGameNavButton = document.getElementById("new-game-nav-button");
const howToPlayButton = document.getElementById("how-to-play-nav-button");
const startNewGameButton = document.getElementById("start-new-game-button");
const siteNameButton = document.getElementById("site-name-button");
const startButtonHolderEl = document.getElementById("start-button-holder");
const messageEl = document.getElementById("message");
const hitMissMessageEl = document.getElementById("hit-miss-message");
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
const rotateButtons = Array.from(document.getElementsByClassName("rotate-button"));
const doneSettingShipsButtons = Array.from(document.getElementsByClassName("done-setting-ships-button"));
const playerOneBoardTitle = document.getElementById("player-one-board-title");
const playerTwoBoardTitle = document.getElementById("player-two-board-title");
const triviaSectionEl = document.getElementById("trivia-window");
const triviaQuestionEl = document.getElementById("trivia-question");
const triviaAnswerButtons = Array.from(document.getElementsByClassName("answer-button"));
const triviaMessageEl = document.getElementById("trivia-right-wrong-message");

//Ship elements will be updated to the global cache once a new game has started and they've been created

let shipEls;
let carrierPNG;
let cruiserPNG;
let submarinePNG;
let floaterPNG;

//Set up necessary event listeners

newGameNavButton.addEventListener("click",startNewGame);
startNewGameButton.addEventListener("click",startNewGame);
howToPlayButton.addEventListener("click",openHowToPlay);
siteNameButton.addEventListener("click",init);
closeHowToWindowButton.addEventListener("click",closeHowTo);
rotateButtons.forEach((button) => button.addEventListener("click",rotateShips));
doneSettingShipsButtons.forEach((button) => button.addEventListener("click",checkShipsToSet));
document.addEventListener("keydown",function(e) {
  if (e.key.toLowerCase() === "r") {
    rotateShips();
  }
})

//Class to create new ships at the start of each game

class ShipIcon {
  constructor(shipType, shipName, src, alt) {
    this.shipType = shipType;
    this.shipName = shipName;
    this.src = src;
    this.alt = alt;
    this.draggable = true;
    this.isShip = "ship";
  }
}

//Initialize homescreen state on new session

init();

/*----- Game Set-up Section -----*/

//Initializes a fresh game state 

function init() {
  renderInit();
  resetGame();
}

//Begins a game when "Start New Game" is clicked

function startNewGame() {
  init();
  renderStart();
  makeShips();
  shipSetUp();
}

//Renders the home screen

function renderInit () {
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
  shipRepoOneEl.classList.add("ship-repository-vertical");
  shipRepoOneEl.classList.remove("ship-repository-horizontal");
  shipRepoTwoEl.classList.add("ship-repository-vertical");
  shipRepoTwoEl.classList.remove("ship-repository-horizontal");
  playerOneBoardTitle.textContent = `${playerOne}'s Board`;
  playerTwoBoardTitle.textContent = `${playerTwo}'s Board`;
}

//Sets up the screen to allow player 1 to begin setting ships on their board

function renderStart() {
  startButtonHolderEl.classList.add("start-button-holder-hidden");
  startButtonHolderEl.classList.remove("start-button-holder-visible");
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
}

//Generates the ships to be used for a game

function makeShips() {
  const p1Carrier = new ShipIcon("carrier-png","p1-carrier-png","./carrier.png","Carrier");
  const p1Cruiser = new ShipIcon("cruiser-png","p1-cruiser-png","./cruiser.png","Cruiser");
  const p1Submarine1 = new ShipIcon("submarine-png","p1-submarine-1-png","./submarine.png","Submarine");
  const p1Submarine2 = new ShipIcon("submarine-png","p1-submarine-2-png","./submarine.png","Submarine");
  const p1Floater = new ShipIcon("floater-png","p1-floater-png","./floater.png","Floater");
  const p2Carrier = new ShipIcon("carrier-png","p2-carrier-png","./carrier.png","Carrier");
  const p2Cruiser = new ShipIcon("cruiser-png","p2-cruiser-png","./cruiser.png","Cruiser");
  const p2Submarine1 = new ShipIcon("submarine-png","p2-submarine-1-png","./submarine.png","Submarine");
  const p2Submarine2 = new ShipIcon("submarine-png","p2-submarine-2-png","./submarine.png","Submarine");
  const p2Floater = new ShipIcon("floater-png","p2-floater-png","./floater.png","Floater");

  const playerOneShips = [p1Carrier,p1Cruiser,p1Submarine1,p1Submarine2,p1Floater];
  const playerTwoShips = [p2Carrier,p2Cruiser,p2Submarine1,p2Submarine2,p2Floater];

  loadShips(playerOneShips,shipRepoOneEl);
  loadShips(playerTwoShips,shipRepoTwoEl);

  globalShips();

  setShipAndBoardEventListeners();
}

//Loads the ships into the html for each player's ship repo

function loadShips(playerShips, shipRepo) {
  playerShips.forEach((ship) => {
    const imgEl = document.createElement("img");
    imgEl.classList.add(ship.shipType, ship.isShip);
    imgEl.id = ship.shipName;
    imgEl.src = ship.src;
    imgEl.draggable = ship.draggable;
    imgEl.alt = ship.alt;
    shipRepo.appendChild(imgEl);
  })
}

//Assign ships to variables for global use

function globalShips() {
  shipEls = document.getElementsByClassName("ship");
  carrierPNG = Array.from(document.getElementsByClassName("carrier-png"));
  cruiserPNG = Array.from(document.getElementsByClassName("cruiser-png"));
  submarinePNG = Array.from(document.getElementsByClassName("submarine-png"));
  floaterPNG = Array.from(document.getElementsByClassName("floater-png"));
}

// Sets event listeners for dragging and dropping ships onto the board once ships have been created

function setShipAndBoardEventListeners() {
  dragstartEventListener();
  dragoverEventListener(playerOneBoardEls, playerOneBoard);
  dragoverEventListener(playerTwoBoardEls, playerTwoBoard);
  dragleaveEventListener(playerOneBoardEls);
  dragleaveEventListener(playerTwoBoardEls);
  dropEventListener(playerOneBoardEls, playerOneBoard);
  dropEventListener(playerTwoBoardEls, playerTwoBoard);
}

//Sets event listener to cache the dragged ship when a player starts dragging

function dragstartEventListener() {
  for(let ship of shipEls) {
    ship.addEventListener("dragstart",function(e) {
    draggedShip = e.target;
    })
  }
}

//Sets event listener to monitor if a ship is in a legal drop position while a ship is being dragged over the board

function dragoverEventListener(board, boardArray) {
  for(let square of board) {
    square.addEventListener("dragover",function(e) {
      const shipSize = shipSizes[draggedShip.id];
      let idx;
      if (turn === 1) {
        idx = Number(square.id);
      } else {
        idx = Number(square.id - 100);
      }
      let shipSquares = [];
      let overlap = [];
      let noOverlap;
      for (let i=0; i<shipSize;i++) {
        if (angle === 0)  {
          shipSquares.push(board[idx + i])
        } else {
          shipSquares.push(board[idx + (10 * i)])
        }
      } 
      for (let shipSquare of shipSquares) {
        if (turn === 1) {
          if (boardArray[Number(shipSquare.id)] === 1) {
            overlap.push(true);
          }
        } else {
          if (boardArray[Number(shipSquare.id) - 100] === 1) {
          overlap.push(true);
          }
        }
      }
      noOverlap = overlap.length === 0;
      overlap = [];
      if (angle === 0 && noOverlap) {
        if (10 - idx % 10 >= shipSize) {
          e.preventDefault();
          addPreview(shipSize,board,idx);
        }
      } else if (angle === 90 && noOverlap) {
        if (10 - (Math.floor(idx / 10)) >= shipSize) {
          e.preventDefault();
          addPreview(shipSize,board,idx);
        }
      }
    })
  }
}

//Sets event listener to remove the drop-preview when no longer dragging a ship over a certain square

function dragleaveEventListener(board) {
  for(let square of board) {
    square.addEventListener("dragleave",function(e) {
      removePreview();
    })
  }
}

//Sets event listener to update the board array storing ship locations and update the visual board when ships are dropped

function dropEventListener(board, boardArray) {
  for(let square of board) {
    square.addEventListener("drop",function(e) {
      const shipSize = shipSizes[draggedShip.id];
      let idx;
      if (turn === 1) {
        idx = Number(square.id);
      } else {
        idx = Number(square.id) - 100;
      }
      for (let i=0; i<shipSize; i++) {
        if (angle === 0) {
          boardArray[idx + i] = 1;
          board[idx + i].classList.add('ship-location-background');
        } else {
          boardArray[idx + (10 * i)] = 1;
          board[idx + (10 * i)].classList.add('ship-location-background');
        }
      }
      draggedShip.remove();
      removePreview();
    })
  }
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

/*--- Ship Placement Section ---*/

//Prepares screen for accepting user input to place ships on their respective boards

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

//Changes the orientation of ships yet to be set by 90 degrees to toggle between horizontal and vertical placement

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

//Checks that a player has set all ships on their board before allowing them to finish setup

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
    }
  } else {
    if (shipRepoTwoEl.innerHTML.trim() === "") {
      changeTurn();
      startGuessing();
    } else {
      messageEl.textContent = "Place all ships on the board before proceeding."
    }
  }
}

/* ----- Battleship Guessing Section -----*/

//Render the screen with the format for making guesses and add event listeners to enable guessing

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
  resetTrivia();
  if (turn === 1 && !winner) {
    if (playerTwoBoard[idx] === 1) {
      e.target.classList.add("hit");
      e.target.removeEventListener("click", makeGuessPlayerOne);
      playerTwoBoard[idx] = 0;
      hitMessage();
      checkForWin(playerTwoBoard);
      initTrivia();
    } else {
      e.target.classList.add("miss");
      e.target.removeEventListener("click", makeGuessPlayerOne);
      missMessage();
      changeTurn();
    }
  } else {
    messageEl.textContent = `${playerTwo} must guess a square on ${playerOne}'s board.`;
  }
}

function makeGuessPlayerTwo(e) {
  let idx = Number(e.target.id);
  resetTrivia();
  if (turn === -1 && !winner) {
    if (playerOneBoard[idx] === 1) {
      e.target.classList.add("hit");
      e.target.removeEventListener("click", makeGuessPlayerTwo);
      playerOneBoard[idx] = 0;
      hitMessage();
      checkForWin(playerOneBoard);
      initTrivia();
    } else {
      e.target.classList.add("miss");
      e.target.removeEventListener("click", makeGuessPlayerTwo);
      missMessage();
      changeTurn();
    }
  } else {
    messageEl.textContent = `${playerOne} must guess a square on ${playerTwo}'s board.`;
  }
}

//Display hit message when a battleship position is guessed correctly

function hitMessage() {
  hitMissMessageEl.textContent = "Excellent shot!";
}

//Display miss message when an empty square is guessed

function missMessage() {
  hitMissMessageEl.textContent = "Ah, so close! Probably...";
}

//Changes player turn and displays that it is the current players turn

function changeTurn() {
  turn *= -1;
  turn === 1 ? currentPlayer = playerOne : currentPlayer = playerTwo;
  messageEl.textContent = `It is ${currentPlayer}'s turn.`;
}

//Evaluate if the win conditions have been met at the end of each turn

function checkForWin(board) {
  let sum = board.reduce((prev,num) => {
    prev += num;
    return prev;
  },0)
  if (sum === 0) {
    turn === 1 ? winUpdate(playerOne) : winUpdate(playerTwo);
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
  hitMissMessageEl.textContent = "";
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
  turn = 1;
  angle = 0;
  clearBoard(playerOneBoardEls) ;
  clearBoard(playerTwoBoardEls);
  removePreview();
  messageEl.textContent = "";
  shipRepoOneEl.innerHTML = "";
  shipRepoTwoEl.innerHTML = "";
}

//Clears the board visually

function clearBoard(board) {
  for (let square of board) {
    square.classList.remove("hit");
    square.classList.remove("miss");
    square.classList.remove("ship-location-background");
  }
}

/* ----- Trivia Section -----*/

//Calls support functions to load and render trivia questions

function initTrivia() {
  loadTriviaQuestion();
  renderTrivia();
}

//Load a random question from the trivia.json file

function loadTriviaQuestion() {
  let random = Math.floor(Math.random() * 34);
  console.log(random);
  triviaQuestion = trivia[random].question;
  triviaOptions = trivia[random].options;
  triviaAnswer = trivia[random].answer;
}

//Render a question and four possible answers into the trivia window

function renderTrivia() {
  triviaQuestionEl.textContent = triviaQuestion;
  for (let i=0; i<triviaOptions.length; i++) {
    triviaAnswerButtons[i].textContent = triviaOptions[i];
    triviaAnswerButtons[i].addEventListener("click", answerTrivia);
  }
  triviaSectionEl.classList.remove("trivia-window-hidden");
  triviaSectionEl.classList.add("trivia-window-visible");
}

//Validate if the user selected the correct answer to the trivia question and render correct/incorrect choice visually

function answerTrivia(e) {
  if (e.target.textContent !== triviaAnswer) {
    e.target.classList.add("wrong-answer");
    triviaMessageEl.textContent = "Hmm, strange, but that doesn't seem to be quite right...";
    clearTriviaMessage();
    changeTurn();
  } else {
    triviaMessageEl.textContent = "Correct! So absolutely, wonderfully correct!";
    clearTriviaMessage();
  }
  triviaAnswerButtons.forEach((answerButton) => {
    if (answerButton.textContent === triviaAnswer) {
      answerButton.classList.add("correct-answer");
    }
    answerButton.removeEventListener("click", answerTrivia);
  })
}

function resetTrivia() {
  triviaAnswerButtons.forEach((answerButton) => {
    answerButton.classList.remove("correct-answer");
    answerButton.classList.remove("wrong-answer");
    triviaSectionEl.classList.remove("trivia-window-visible");
    triviaSectionEl.classList.add("trivia-window-hidden");
  })
}

function clearTriviaMessage() {
  setTimeout(() => {
    triviaMessageEl.textContent = "";
  },3000)
}