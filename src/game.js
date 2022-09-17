import playerFactory from './playerFactory';
import gameboardFactory from './gameboardFactory';
import shipFactory from './shipFactory';
import domController from './domController';

const game = () => {
  const computerGameboard = gameboardFactory();
  const playerGameboard = gameboardFactory();
  const player = playerFactory(computerGameboard);
  const computer = playerFactory(playerGameboard);
  const dom = domController();

  const placeShips = () => {
    [computerGameboard, playerGameboard].forEach((board) => {
      board.randomlyPlaceShips(shipFactory, 4, 3, 2);
    });
  };

  // Check if game is over and return bool
  const isGameOver = () => {
    console.log(computerGameboard);
    if (computerGameboard.isGameOver() || playerGameboard.isGameOver()) {
      return true;
    }

    return false;
  };

  // Starts a new game and reinitialize dom
  const startGame = () => {
    placeShips();
    dom.initializeDom(playerGameboard.board, computerGameboard.board);
  };

  const endGame = () => {
    dom.computerBoardContainer.removeEventListener('click', roundOfPlay);
  };

  // A round of play, executed after player selects a move
  const roundOfPlay = (clickEvent) => {
    const square = clickEvent.target.closest('.square');
    if (!square || square.classList.contains('hit')) { return; }

    // Make the players move
    const playerRow = Number(square.getAttribute('data-row'));
    const playerCol = Number(square.getAttribute('data-col'));
    dom.attackBoard(playerRow, playerCol, dom.computerBoardContainer);
    player.attack([playerRow, playerCol]);

    // Check for winner
    if (isGameOver()) {
      dom.generateWinMessage('Congratulations, you won!');
      endGame();
      return;
    }

    // Make the computers move
    const [computerRow, computerCol] = computer.randomAttack();
    dom.attackBoard(computerRow, computerCol, dom.playerBoardContainer);
    playerGameboard.receiveAttack([computerRow, computerCol]);

    // Check for winner
    if (isGameOver()) {
      dom.generateWinMessage('Computer wins! Better luck next time...');
      endGame();
    }
  };

  // Event listener for player moves
  dom.computerBoardContainer.addEventListener('click', roundOfPlay);

  return {
    startGame,
    endGame,
  };
};

export default game;
