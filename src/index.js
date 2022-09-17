import game from './game';

const resetBtn = document.getElementById('reset-button');

let battleship = game();
battleship.startGame();

// Instantiate new battleship game and load
resetBtn.addEventListener('click', () => {
  // End current game
  battleship.endGame();

  // Instantiate new game
  battleship = game();
  battleship.startGame();
});
