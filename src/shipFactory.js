const shipFactory = (length) => {
  const condition = new Array(length).fill(0);

  const hit = (position) => {
    condition[position] = 1;
  };

  return {
    length,
    condition,
    hit,
  };
};

export default shipFactory;
