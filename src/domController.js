const domController = () => {
  const boardOneContainer = document.getElementById('board1');
  const boardTwoContainer = document.getElementById('board2');

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

  const initializeDom = (gameboard1, gameboard2) => {
    console.log('initializing');
    boardOneContainer.innerHTML = '';
    boardTwoContainer.innerHTML = '';

    generateGameboard(gameboard1, boardOneContainer);
    generateGameboard(gameboard2, boardTwoContainer);
  };

  return {
    initializeDom,
  };
};

export default domController;
