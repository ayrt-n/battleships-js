import playerFactory from "../src/playerFactory";

test('attack sends enemy gameboard receiveAttack with specified coordinates', () => {
  const receiveAttack = jest.fn(() => {});
  const fakeEnemyGameboard = { receiveAttack };

  const player = playerFactory(fakeEnemyGameboard);
  player.attack([0, 0]);

  expect(receiveAttack.mock.calls.length).toBe(1);
  expect(receiveAttack.mock.calls[0][0]).toEqual([0, 0]);
});
