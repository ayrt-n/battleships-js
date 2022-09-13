import shipFactory from "../src/shipFactory";
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

  // Set up dummy ship object factory with mock hit function
  const hit = jest.fn(() => 'hit');
  const fakeShip = () => ({ hit });

  gameboard.placeShip(fakeShip, [0, 0], [0, 1], [0, 2]);

  expect(gameboard.receiveAttack([0, 3])).toBeFalsy();
});

test('receiveAttack returns true if coordinates hit a ship', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object factory with mock hit function
  const hit = jest.fn(() => 'hit');
  const fakeShip = () => ({ hit });

  gameboard.placeShip(fakeShip, [0, 0], [0, 1], [0, 2]);

  expect(gameboard.receiveAttack([0, 1])).toBeTruthy();
});

test('receiveAttack sends hit function to ship if coordinates hit a ship', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object factory with mock hit function
  const hit = jest.fn(() => 'hit');
  const fakeShip = () => ({ hit });

  gameboard.placeShip(fakeShip, [0, 0], [0, 1], [0, 2]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);

  expect(hit.mock.calls.length).toBe(2);
});

test('receiveAttack does not send hit function to ship if coordinates do not hit a ship', () => {
  const gameboard = gameboardFactory();

  // Set up dummy ship object factory with mock hit function
  const hit = jest.fn(() => 'hit');
  const fakeShip = () => ({ hit });

  gameboard.placeShip(fakeShip, [0, 0], [0, 1], [0, 2]);
  gameboard.receiveAttack([0, 3]);
  gameboard.receiveAttack([1, 0]);

  expect(hit.mock.calls.length).toBe(0);
});
