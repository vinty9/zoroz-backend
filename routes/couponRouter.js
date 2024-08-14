import express from "express";
import { addCoupon, getAllCoupons } from "../controllers/couponController.js";

export const couponRouter = express.Router();
couponRouter.post("/add", addCoupon);
couponRouter.get("/getCoupons", getAllCoupons);
