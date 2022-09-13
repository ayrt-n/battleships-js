const playerFactory = (enemyGameboard) => {
  const attack = (coordinate) => {
    const isValidMove = enemyGameboard.receiveAttack(coordinate);
    return isValidMove;
  };

  return {
    attack,
  };
};

export default playerFactory;
