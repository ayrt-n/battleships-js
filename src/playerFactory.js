const playerFactory = (enemyGameboard) => {
  const createRemainingMovesArray = (gameboard = enemyGameboard) => {
    const tmp = [];

    for (let r = 0; r < gameboard.board.length; r += 1) {
      for (let c = 0; c < gameboard.board[0].length; c += 1) {
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
    const randomMove = remainingMoves[randomIndex];
    remainingMoves.splice(randomIndex, 1);

    return randomMove;
  };

  return {
    attack,
    randomAttack,
  };
};

export default playerFactory;
