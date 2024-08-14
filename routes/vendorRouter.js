import express from "express";
import {
  getVendor,
  logout,
  postOTP,
  updateVendor,
  verifyOTP,
} from "../controllers/vendorController.js";

export const vendorRouter = express.Router();

vendorRouter.get("/:id", getVendor);
vendorRouter.post("/logout", logout);
vendorRouter.post("/sendOtp", postOTP);
vendorRouter.post("/verifyOtp", verifyOTP);
vendorRouter.post("/update/:id", updateVendor);
