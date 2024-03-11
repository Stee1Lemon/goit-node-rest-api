import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

const { SECRET_JWT } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_JWT);
    const user = await userModel.User.findById(id);
    if (!user || user.token !== token || user.token === null) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

export default authenticate;
