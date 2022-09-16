import game from './game';

const resetBtn = document.getElementById('reset-button');

let battleship = game();
battleship.startGame();

// Instantiate new battleship game and load
resetBtn.addEventListener('click', () => {
  battleship = game();
  battleship.startGame();
});
