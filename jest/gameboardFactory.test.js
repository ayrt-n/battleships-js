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
