import express from "express";
import { userOtp } from "../controllers/otpController.js";

export const otpRouter = express.Router();
otpRouter.get("/otp", userOtp);
