const compareMongoIds = (firstId, secondId) => {
  return firstId.toString() === secondId.toString() ? true : false;
};

export default compareMongoIds;
