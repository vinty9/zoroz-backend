import express from "express";
import {
  getUser,
  googleLogin,
  logout,
  postOTP,
  updateUser,
  verifyOTP,
} from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.get("/:id", getUser);
authRouter.post("/logout", logout);
authRouter.post("/sendOtp", postOTP);
authRouter.post("/verifyOtp", verifyOTP);
authRouter.post("/google", googleLogin);
authRouter.post("/update/:id", updateUser);
