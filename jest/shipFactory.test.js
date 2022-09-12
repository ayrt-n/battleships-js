import shipFactory from '../src/shipFactory';

test('calling ship factory function with integer returns new ship with specified length', () => {
  const shipLengthThree = shipFactory(3);
  const shipLengthTen = shipFactory(10);

  expect(shipLengthThree.length).toBe(3);
  expect(shipLengthTen.length).toBe(10);
});

test('calling ship factory function with integer returns new ship with condition array of 0s of specified length', () => {
  const shipLengthThree = shipFactory(3);
  const shipLengthTen = shipFactory(10);

  expect(shipLengthThree.condition).toEqual([0, 0, 0]);
  expect(shipLengthTen.condition).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});
