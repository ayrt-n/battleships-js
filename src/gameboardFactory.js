const gameboardFactory = () => {
  const board = new Array(10).fill(new Array(10));

  return {
    board,
  };
};

export default gameboardFactory;
