import express from "express";
import {
  addBrand,
  addCategory,
  getBrands,
  getCategories,
  getSubCategoriesByCategory,
} from "../controllers/categoryController.js";

export const categoryRouter = express.Router();
categoryRouter.post("/addCategory", addCategory);
categoryRouter.get("/getCategories", getCategories);
categoryRouter.get("/getBrands", getBrands);
categoryRouter.post("/addBrand", addBrand);
categoryRouter.get("/getSubCategories/:category", getSubCategoriesByCategory);
