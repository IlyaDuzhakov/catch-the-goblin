## Catch the Goblin!
An interactive JavaScript mini-game where the player must quickly catch a goblin appearing in random cells on the game board.
The project includes a scoring system, limited attempts, popup notifications for new records, best score saving via localStorage, a restart game button, and a fully responsive interface for desktop, tablet, and mobile devices.

## Running Tests
## npm test
The project is covered with tests using Jest — implemented 10 unit tests that verify the game logic, board generation, click handling, game over conditions, record saving, and restart mechanics.

##  Game Mechanics
The player must click the goblin before it disappears.
If the player misses the goblin or clicks on an empty cell, the number of remaining attempts decreases.
After all attempts are used:
the game ends;
a Game Over message appears;
the New Game button becomes available;
a congratulation popup appears if a new high score is achieved.

![CI](https://github.com/IlyaDuzhakov/catch-the-goblin/actions/workflows/main.yml/badge.svg)

##  Live Demo
https://ilyaduzhakov.github.io/catch-the-goblin/

##  Screenshots

### Main Gameplay
![Gameplay](./screenshots/main-gameplay.png)

### New Record Popup
![Popup](./screenshots/new-record-popup.png)

### mobail_version
![mobail](./screenshots/mobail_version.png)