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

  const start = () => {
    placeShips();
    dom.initializeDom(playerGameboard.board, computerGameboard.board);
  };

  return {
    start,
  };
};

export default game;
