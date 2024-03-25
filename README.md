# Battleship Trivia

## Background

I built this game to combine one of my favorite games from my childhood (Battleship) with my favorite game as an adult (Trivia). Battleship in particular has a fair amount of compexity in making sure ship set-up functions properly and doesn't break any rules, so this felt like a great first project in putting JavaScript to work.

## How-to-Play

 Battleship Trivia is a new spin on an old classic. This game combines classic Battleship with Trivia. First, each player will set up their ships like in standard battleship. Next, the players will take turns guessing squares to find and sink their opponent's ships. In this version, the twist is that after getting a succesful hit on an opponent's ship, the current player will be given a trivia question. If they answer the question correctly, they will be able to guess another square. This can continue as long as a player keeps getting hits and answering questions correctly. If a question is answered incorrectly, it's the end of the players turn and the game continues. The winner is the player that sinks all of their opponent's ships first.

## Play the Game

[Play here.](https://battleship-trivia.vercel.app/) Game hosted by Vercel. 

## Technologies Used

- Javascript
- JSON
- HTML5
- CSS

## Wireframe Screenshots

### Start Screen

![Start screen](./StartStateScreenshotBattleshipTrivia.png)

### How-to-Play Screen

![How-to-Play](./HowToPlayStateScreenshotBattleshipTrivia.png)

### Ship Setup Screen

![Ship Setup Screen](./ShipSetUpWireframe.png)

### Mid-game Screen

![Mid-game Screen](./MidGameWireframe.png)

### End-game Screen

![End-game Screen](./EndGameWireframe.png)

## Timeline

| Day       |   | Task                                                              | Status     | Notes                                      |
|-----------|---|-------------------------------------------------------------------|------------|--------------------------------------------|
| Sunday    |   | Create proposal, make wireframes of each game state               | Completed  |                                            |
| Monday    |   | Create HTML, CSS, JS files with basic scaffolding                 | Completed  |                                            |
| Tuesday   |   | Add functionality for setting ships and making guesses            | Completed  |                                            |
| Wednesday |   | Add content and styling, this includes battleships themselves     | Completed  | Some functionality was completed Wednesday |
| Thursdary |   | Continue with styling and add trivia functionality and JSON files | Completed  |                                            |
| Friday    |   | Finalize MVP, clean code, breakout functions                      | Completed  |                                            |
| Saturday  |   | Work on stretch goals, particularly a database for the trivia     | Incomplete |                                            |
| Sunday    |   | Finalize work on stretch goals, go through final user testing     | Completed  | Had friends play game to get feedback      |
| Monday    |   | Present work                                                      |            |                                            |

Further tracking of goals and tasks was managed on [this Trello board.](https://trello.com/b/pFpab8LH/battleship-trivia)

## Attributions

  - Images:
    * iconfinder PNGs
  - Fonts: 
    * Google Fonts: [Cantarell](https://fonts.google.com/specimen/Cantarell)

## Next Steps

- Program an AI to play against (and give it some ruleset for how often it correctly answers trivia questions)
- Improve art design, and make the design change depending on the trivia category selected
- Store trivia questions in a database, and connect that database to the front-end deployment