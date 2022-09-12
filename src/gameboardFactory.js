import shipFactory from './shipFactory';

const gameboardFactory = () => {
  const board = new Array(10).fill(new Array(10));

  const placeShip = (...coordinates) => {
    const ship = shipFactory(coordinates.length);

    coordinates.forEach((coordinate, index) => {
      const row = coordinate[0];
      const col = coordinate[1];

      board[row][col] = {
        ship,
        index,
      };
    });
  };

  return {
    board,
    placeShip,
  };
};

export default gameboardFactory;
