const shipFactory = (length) => {
  const condition = new Array(length).fill(0);

  return {
    length,
    condition,
  };
};

export default shipFactory;
