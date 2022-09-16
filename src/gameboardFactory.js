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

  const isOutOfBounds = (coordinate) => {
    const [row, col] = coordinate;
    if (row >= board.length || row < 0) { return true; }
    if (col >= board[0].length || col < 0) { return true; }

    return false;
  };

  const placeShip = (shipCallBack, ...coordinates) => {
    for (let i = 0; i < coordinates.length; i += 1) {
      if (isOutOfBounds(coordinates[i])) { return false; }
    }

    const ship = shipCallBack(coordinates.length);
    ships.push(ship);

    coordinates.forEach((coordinate, index) => {
      const [row, col] = coordinate;

      board[row][col] = {
        ship,
        index,
      };
    });

    return true;
  };

  const receiveAttack = (coordinate) => {
    if (isOutOfBounds(coordinate)) {
      return false;
    }

    const [row, col] = coordinate;
    if (!board[row][col]) {
      missedShots.push([row, col]);
      return true;
    }

    const { ship, index } = board[row][col];
    ship.hit(index);
    return true;
  };

  const isGameOver = (shipsArray = ships) => {
    for (let i = 0; i < shipsArray.length; i += 1) {
      if (!shipsArray[i].isSunk()) {
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
