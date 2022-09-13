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

  // Set up dummy ship factory to use in placeShip
  const fakeShip = () => ({});
  gameboard.placeShip(fakeShip, [0, 0], [0, 1], [0, 2]);

  expect(gameboard.board[0][0]).toEqual({ ship: fakeShip(), index: 0 });
  expect(gameboard.board[0][1]).toEqual({ ship: fakeShip(), index: 1 });
  expect(gameboard.board[0][2]).toEqual({ ship: fakeShip(), index: 2 });
});

test('receiveAttack returns false if coordinates do not hit a ship', () => {
  const gameboard = gameboardFactory();

  expect(gameboard.receiveAttack([0, 0])).toBeFalsy();
});

test('receiveAttack returns true if coordinates hit a ship', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object with empty hit function
  const ship = { hit: () => {} };

  gameboard.board[0][0] = {
    ship,
    position: 0,
  };

  expect(gameboard.receiveAttack([0, 0])).toBeTruthy();
});

test('receiveAttack sends hit function to ship if coordinates hit a ship', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object with mock hit function
  const hit = jest.fn(() => 'hit');
  const ship = { hit };

  gameboard.board[0][0] = { ship, position: 0 };
  gameboard.board[0][1] = { ship, position: 1 };
  gameboard.board[0][2] = { ship, position: 2 };

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  expect(hit.mock.calls.length).toBe(3);
});

test('receiveAttack does not send hit function to ship if coordinates do not hit a ship', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object with mock hit function
  const hit = jest.fn(() => 'hit');
  const ship = { hit };

  gameboard.board[0][0] = { ship, position: 0 };
  gameboard.board[0][1] = { ship, position: 1 };
  gameboard.board[0][2] = { ship, position: 2 };

  gameboard.receiveAttack([0, 3]);
  gameboard.receiveAttack([1, 0]);

  expect(hit.mock.calls.length).toBe(0);
});

test('receiveAttack keeps track of all missed shots', () => {
  const gameboard = gameboardFactory();

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 9]);
  gameboard.receiveAttack([5, 5]);

  expect(gameboard.missedShots).toEqual([[0, 0], [0, 9], [5, 5]]);
});

test('isGameOver returns true if all ships have been sunk', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object which says it is sunk
  const sunkShip = { isSunk: true };
  const shipsArray = [sunkShip];

  expect(gameboard.isGameOver(shipsArray)).toBe(true);
});

test('isGameOver returns false if all ships have not been sunk', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object which says it is sunk
  const sunkShip = { isSunk: true };
  const aliveShip = { isSunk: false };
  const shipsArray = [sunkShip, aliveShip];

  expect(gameboard.isGameOver(shipsArray)).toBe(false);
});