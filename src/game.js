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
      board.placeShip(shipFactory, [0, 0], [0, 1], [0, 2]);
      board.placeShip(shipFactory, [5, 5], [6, 5], [7, 5], [8, 5]);
      board.placeShip(shipFactory, [2, 5], [2, 6], [2, 7], [2, 8]);
    });
  };

  // Check if game is over and return bool
  const isGameOver = () => {
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
      dom.computerBoardContainer.removeEventListener('click', roundOfPlay);
      return;
    }

    // Make the computers move
    const [computerRow, computerCol] = computer.randomAttack();
    dom.attackBoard(computerRow, computerCol, dom.playerBoardContainer);
    playerGameboard.receiveAttack([computerRow, computerCol]);

    // Check for winner
    if (isGameOver()) {
      dom.generateWinMessage('Computer wins! Better luck next time...');
      dom.computerBoardContainer.removeEventListener('click', roundOfPlay);
    }
  };

  // Event listener for player moves
  dom.computerBoardContainer.addEventListener('click', roundOfPlay);

  return {
    startGame,
  };
};

export default game;
