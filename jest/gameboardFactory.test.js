import gameboardFactory from "../src/gameboardFactory";

test('instantiating new gameboard creates 10x10 matrix of arrays', () => {
  const gameboard = gameboardFactory();

  expect(gameboard.board).toEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]);
});

test('placeShip creates ship and places at specific coordinates', () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip([0, 0], [0, 1], [0, 2]);

  expect(gameboard.board[0][0].ship).toBeTruthy();
  expect(gameboard.board[0][1].ship).toBeTruthy();
  expect(gameboard.board[0][2].ship).toBeTruthy();
});
