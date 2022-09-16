const domController = () => {
  const playerBoardContainer = document.getElementById('board1');
  const computerBoardContainer = document.getElementById('board2');

  const generateGameboard = (gameboard, gameboardContainer) => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const div = document.createElement('div');
        div.classList.add('square');
        div.setAttribute('data-row', i);
        div.setAttribute('data-col', j);

        if (gameboard[i][j]) {
          div.classList.add('ship');
        }

        gameboardContainer.appendChild(div);
      }
    }
  };

  const attackBoard = (row, col, board) => {
    const square = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    square.classList.add('hit');
  };

  const initializeDom = (gameboard1, gameboard2) => {
    console.log('initializing');
    playerBoardContainer.innerHTML = '';
    computerBoardContainer.innerHTML = '';

    generateGameboard(gameboard1, playerBoardContainer);
    generateGameboard(gameboard2, computerBoardContainer);
  };

  return {
    computerBoardContainer,
    playerBoardContainer,
    attackBoard,
    initializeDom,
  };
};

export default domController;
