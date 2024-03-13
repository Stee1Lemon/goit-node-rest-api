import HttpError from "./HttpError.js";

const compareMongoIds = (firstId, secondId) => {
  //   console.log(userId);
  //   console.log(contactOwner);
  // if (userId.toString() !== contactOwner.toString()) throw HttpError(404);
  return firstId.toString() === secondId.toString() ? true : false;
};

export default compareMongoIds;
