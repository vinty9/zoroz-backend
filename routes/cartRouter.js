import express from "express";
import {
  addToCart,
  getProductsFromCart,
  manageQuantity,
} from "../controllers/cartController.js";

export const cartRouter = express.Router();
cartRouter.post("/:id", addToCart);
cartRouter.get("/:id", getProductsFromCart);
cartRouter.post("/:customer/:product", manageQuantity);
