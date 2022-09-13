import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const createGameboard = (length) => {
    const tmpBoard = new Array(length);
    for (let i = 0; i < length; i += 1) {
      tmpBoard[i] = new Array(length);
    }

    return tmpBoard;
  };

  const board = createGameboard(10);

  const placeShip = (shipCallBack, ...coordinates) => {
    const ship = shipCallBack(coordinates.length);

    coordinates.forEach((coordinate, index) => {
      const [row, col] = coordinate;

      board[row][col] = {
        ship,
        index,
      };
    });
  };

  const receiveAttack = (coordinate) => {
    const [row, col] = coordinate;
    if (!board[row][col]) { return false; }

    const { ship, position } = board[row][col];
    ship.hit(position);
    return true;
  };

  return {
    board,
    placeShip,
    receiveAttack,
  };
};

export default gameboardFactory;
