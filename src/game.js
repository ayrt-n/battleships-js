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

  // Check for winner and return Player, Computer, or undefined if no winner
  const checkWinner = () => {
    if (computerGameboard.isGameOver()) {
      return 'player';
    }
    if (playerGameboard.isGameOver()) {
      return 'computer';
    }

    return undefined;
  };

  // Starts a new game and reinitialize dom
  const start = () => {
    placeShips();
    dom.initializeDom(playerGameboard.board, computerGameboard.board);
  };

  // Event listener for player moves
  dom.computerBoardContainer.addEventListener('click', (e) => {
    const square = e.target.closest('.square');
    if (!square || square.classList.contains('hit')) { return; }

    // Make the players move
    const playerRow = Number(square.getAttribute('data-row'));
    const playerCol = Number(square.getAttribute('data-col'));
    dom.attackBoard(playerRow, playerCol, dom.computerBoardContainer);
    player.attack([playerRow, playerCol]);

    // Check for winner
    console.log(checkWinner());

    // Make the computers move
    const [computerRow, computerCol] = computer.randomAttack();
    dom.attackBoard(computerRow, computerCol, dom.playerBoardContainer);
    playerGameboard.receiveAttack([computerRow, computerCol]);

    // Check for winner
    console.log(checkWinner());
  });

  return {
    start,
  };
};

export default game;
