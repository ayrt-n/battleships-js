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

  // Generates random board coordinates to place ship - NOT EFFICIENT IMPLEMENTATION
  const generateRandomShipCoordinates = (shipLength) => {
    // Randomly determine if ship will be placed horizontally (1) or vertically (0)
    const horizontal = Math.round(Math.random());
    let shipCoordinates = [];
    const maxRow = horizontal ? board.length - 1 : board.length - 1 - shipLength;
    const maxCol = horizontal ? board[0].length - 1 - shipLength : board[0].length - 1;

    const startRow = Math.floor(Math.random() * (maxRow - 0 + 1) + 0);
    const startCol = Math.floor(Math.random() * (maxCol - 0 + 1) + 0);

    for (let i = 0; i < shipLength; i += 1) {
      if (horizontal) {
        shipCoordinates.push([startRow, startCol + i]);
      } else {
        shipCoordinates.push([startRow + i, startCol]);
      }
    }

    // Check if overlap between any other ships, if yes, rerun algorithm (THIS IS NOT EFFICIENT)
    shipCoordinates.forEach((coordinate) => {
      const [row, col] = coordinate;
      if (board[row][col]) {
        shipCoordinates = generateRandomShipCoordinates(shipLength);
        return shipCoordinates;
      }
    });

    return shipCoordinates;
  };

  const randomlyPlaceShips = (shipCallBack, ...shipLengths) => {
    shipLengths.forEach((shipLength) => {
      const coordinates = generateRandomShipCoordinates(shipLength);
      placeShip(shipCallBack, ...coordinates);
    });
  };

  return {
    board,
    missedShots,
    placeShip,
    randomlyPlaceShips,
    receiveAttack,
    isGameOver,
  };
};

export default gameboardFactory;
