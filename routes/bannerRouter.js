import express from "express";
import {
  addBanner,
  getBanners,
  updateBanner,
} from "../controllers/bannerController.js";

export const bannerRouter = express.Router();

bannerRouter.post("/add", addBanner);
bannerRouter.get("/get", getBanners);
bannerRouter.post("/update", updateBanner);
