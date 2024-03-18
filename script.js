/*--- Set-up and Initialization---*/

//Cache required elements

const newGameNavButton = document.getElementById("new-game-nav-button");
const howToPlayButton = document.getElementById("how-to-play-nav-button");
const startNewGameButton = document.getElementById("start-new-game-button");
const siteNameButton = document.getElementById("site-name-button");
const startButtonHolderEl = document.getElementById("start-button-holder");
const howToPlayWindow = document.getElementById("how-to-play-window"); 
const playerOneBoardEl = document.getElementsByClassName("square1");
const playerOneScoreEl = document.getElementById("player-1-score-name")
const playerTwoScoreEl = document.getElementById("player-2-score-name")

//Set up necessary event listeners

newGameNavButton.addEventListener("click",startNewGame);
startNewGameButton.addEventListener("click",startNewGame);
howToPlayButton.addEventListener("click",openHowToPlay);
siteNameButton.addEventListener("click",init);

//Define required constants

let playerOneBoard = [];
let playerTwoBoard = [];
let playerOneScore = 0;
let playerTwoScore = 0;

//Initialize the game upon load and begin game when "Start New Game" is clicked

init();

function init() {
  for(let i=0; i<playerOneBoardEl.length; i++) {
  playerOneBoard.push(null);
  playerTwoBoard.push(null);
  }
  startButtonHolderEl.classList.add("start-button-holder-visible");
  startButtonHolderEl.classList.remove("start-button-holder-hidden");
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
}

function startNewGame() {
  console.log(playerOneBoard);
  console.log(playerTwoBoard);
  startButtonHolderEl.classList.add("start-button-holder-hidden");
  startButtonHolderEl.classList.remove("start-button-holder-visible");
  howToPlayWindow.classList.add("how-to-play-window-hidden");
  howToPlayWindow.classList.remove("how-to-play-window-visible");
}

//Create a pop-up with a how-to-play message when the how-to-play button is clicked

function openHowToPlay() {
  console.log("How to Play!");
  howToPlayWindow.classList.remove("how-to-play-window-hidden");
  howToPlayWindow.classList.add("how-to-play-window-visible");
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

//Load a question and four possible answers into the trivia window

//Validate if the user selected the correct answer to the trivia question

//Display the correct answer after user selection

//Accept user input when a guess is made of opponent's battleship location

//Register a hit/miss after a player guesses an opponent's battleship location

//Display hit/miss message to the players

//Change player turn (either after trivia question is failed or guess is made of ship location)

//Evaluate if the win conditions have been met at the end of each turn

//Display winning message at the conclusion of the game

//Update the scoreboard at the conclusion of a match

//Abandon the match if both players click "New Game" (if 'Confirm New Game' is clicked as well)

