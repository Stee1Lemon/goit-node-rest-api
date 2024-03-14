import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import upload from "../middlewares/upload.js";
import userModel from "../models/user.js";
import controls from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userModel.registerSchema),
  controls.register
);

authRouter.post("/login", validateBody(userModel.loginSchema), controls.login);

authRouter.get("/logout", authenticate, controls.logout);

authRouter.get("/current", authenticate, controls.current);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(userModel.subscriptionSchema),
  controls.subscription
);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), controls.updateAvatar)

export default authRouter;
