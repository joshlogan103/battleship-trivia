# Project Proposal Example

## Project Choice

- [ ] Battleship Trivia

## Project Description 

My app is called Battle Ship Trivia. It's a game app for players that want a new twist on playing battleship online. Two players can join the game and play a round of Battleship combined with a trivia game. Each turn begins with the player being presented with a trivia question. If they successfully answer the question (by selecting the correct option from four choices), they will be allowed to guess an opponent square and reveal if it's a hit or a miss. If the players fails to answer the question correctly, the turn passes to the opposing player. The game ends when one player has sunk all of the opponent's battle ships, as in the standard battle ship game. There will be a scoreboard which will keep track of wins and losses for each player if more than one match are played in a single session. I'd like to connect my game to a database that stores hundreds of trivia questions in order to maximize replayability. 

As an additional stretch goal, I'd like to offer an alternate mode where players are allowed to guess an opponents square without needing to answer a question first. In this mode, after a successful 'hit', the player will be prompted with a trivia question. If the question is answered correctly a random adjacent square to their most recent guess will have it's state revealed. Beyond the initial scope is allowing players to play vs. an AI, but this is something I'd like to explore in the future.

A quick note on scope - if this seems like too much to combine both the trivia and battleship components, I'll build battleship on it's own first, then add in the trivia component if possible.

## Wire Frames

There are layout grids visible in the design builder which show the board spaces. This view is not available when simply viewing the wireframes via the links below.

**Initial Landing View**

https://www.figma.com/file/3zXkpIdYvj27Yg3lx3Z21h/Battleship-Trivia-Start-State---Wireframe?type=design&node-id=0%3A1&mode=design&t=4023VSf5WofXOH65-1

**How-to-Play View**

https://www.figma.com/file/IoV5TAIOiHLn2p4uM3Snzv/Battleship-Trivia-How-to-play-State---Wireframe?type=design&node-id=0%3A1&mode=design&t=Hfu2gdBB6nT3yXb3-1

**Mid-game View**

https://www.figma.com/file/SqqS4sHSIYgDQDvjd9Hmp8/Battleship-Trivia-Mid-game-State---Wireframe?type=design&node-id=0%3A1&mode=design&t=rlvyJPFEQGHmRD1D-1

**Results View**

https://www.figma.com/file/E7LWUjXFjEBcy7tuQXoQSF/Battleship-Trivia-End-State---Wireframe?type=design&node-id=0%3A1&mode=design&t=oo0y2OeQ1dIL3BJs-1

## User Stories

#### MVP Goals

- As a player, I would like a how-to-play screen to explain the game format, rules and objectives
- As a player, I want my game to recognize when battleships are hit by myself and my opponent and update the game state visually.
- As a player, I would like to be informed when the game is over due to all ships being sunk.
- As a player, I would like to know whose turn it is so that I don't have to keep track.
- As a player, I would like to be informed with some indication when I make a guess of an opponents ship location and whether it is a hit or a miss
- As a player, I would like to be informed with some indication when my opponent makes a guess of my ships' locations and whether it is a hit or a miss
- As a player who requires assistive technologies, I would like accessibility features so that I'm not left out of enjoying the game.
- As a player I would like to be able to restart the game after a win or loss
- As a player, I want the UI to be engaging and out of the way so that I enjoy the experience of playing the game.
- As a player, I would like the trivia portion of the game be clearly presented, and let me know if I got the answer right. If I got the answer wrong, it should show me what the correct answer was.
- As a player, I would like a scoreboard to track my wins and losses over the course of a session. 
\*\*

#### Stretch Goals

- As a player, I would like a victory animation when I win the game, so that I feel good about my victory!
- As a player, I would like to hear an audible sound when I make a guess. The sound should also change based on a hit or a miss.
- As a player, I would like to play this game online so that I don't have to have my challenger sitting next to me.
- As a player, I would like to be able to change to an alternate game mode that changes the way the trivia aspect influeces the game
- As a player, I would like to be able to abandon a game and start again in the same session if both my opponent and I agree to a restart
- As a player, I would like to be able to choose a certain category for the trivia used in game, or play with random categories. I would like the art of the game to update based on the category chosen

#### High-level Pseudo-code (lower level pseudo-code written in script.js)

1) Define the required variables used to track the state of the game

2) Store cached element references

3) Upon loading, the game state should be initialized, and a function should be called to render this game state

4) The state of the game should be rendered to the user

5) Define the required constants

6) Allow each player to set ships on their board

7) Handle a player answering trivia questions and evaluate correctness

8) Allow a player to guess a square on their opponents board and evaluate a hit/miss

9) Store trivia questions/answers locally (or investigate loading from a database)

10) Create 'Abandon Game' functionality

#### Trello Board for Task Planning/Management

https://trello.com/b/pFpab8LH/battleship-trivia

#### Timeline - Daily Accountability

| Day       |   | Task                                                                            | Blockers | Notes |
|-----------|---|---------------------------------------------------------------------------------|----------|-------|
| Sunday    |   | Create proposal and wireframes                                                  |          |       |
| Monday    |   | Create HTML, CSS, JS files with basic scaffolding                               |          |       |
| Tuesday   |   | Add functionality                                                               |          |       |
| Wednesday |   | Add content and styling, this includes battleships and trivia questions/answers |          |       |
| Thursdary |   | Continue with styling and add animations                                        |          |       |
| Friday    |   | Finalize MVP                                                                    |          |       |
| Saturday  |   | Work on stretch goals, particularly a database for the trivia questions/answers |          |       |
| Sunday    |   | Finalize work on stretch goals, go through final user testing                   |          |       |
| Monday    |   | Present work                                                                    |          |       |