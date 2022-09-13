const playerFactory = (enemyGameboard) => {
  const createRemainingMovesArray = (gameboard = enemyGameboard) => {
    const tmp = [];

    for (let r = 0; r < gameboard.board; r += 1) {
      for (let c = 0; c < gameboard.board[0]; c += 1) {
        tmp.push([r, c]);
      }
    }

    return tmp;
  };

  const remainingMoves = createRemainingMovesArray();

  const attack = (coordinate) => {
    const isValidMove = enemyGameboard.receiveAttack(coordinate);
    return isValidMove;
  };

  const randomAttack = () => {
    const randomIndex = Math.floor(Math.random() * remainingMoves.length);
    const coordinates = remainingMoves[randomIndex];

    if (attack(coordinates)) {
      remainingMoves.splice(randomIndex, 1);
      return true;
    }

    return false;
  };

  return {
    attack,
    randomAttack,
  };
};

export default playerFactory;
