const gameboardFactory = () => {
  const ships = [];
  const missedShots = [];

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
    ships.push(ship);

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
    if (!board[row][col]) {
      missedShots.push([row, col]);
      return false;
    }

    const { ship, position } = board[row][col];
    ship.hit(position);
    return true;
  };

  const isGameOver = (shipsArray = ships) => {
    for (let i = 0; i < shipsArray.length; i += 1) {
      if (!shipsArray[i].isSunk) {
        return false;
      }
    }

    return true;
  };

  return {
    board,
    missedShots,
    placeShip,
    receiveAttack,
    isGameOver,
  };
};

export default gameboardFactory;
