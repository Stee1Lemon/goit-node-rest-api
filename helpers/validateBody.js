import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    // console.log(req.params.id);
    // if (!req.params.id) {
    //   next(HttpError(404, "Not Found"));
    // }

    if (Object.keys(req.body).length === 0) {
      console.log("in IF");
      next(HttpError(400, "Body must have at least one field"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
