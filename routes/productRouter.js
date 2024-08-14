import express from "express";

import {
  addMultipleProducts,
  addProduct,
  addReviewToProduct,
  approveProduct,
  deleteReviewFromProduct,
  editReviewForProduct,
  getCounts,
  getCountsForVendor,
  getProductByBrand,
  getProductByCategory,
  getProductById,
  getProducts,
  getProductsBySubCategory,
  getProductsByVendor,
  getProductsForAdmin,
  getProductsForAdminApproval,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";
import { getBrands } from "../controllers/categoryController.js";

export const productRouter = express.Router();
productRouter.post("/addProduct", addProduct);
productRouter.post("/updateProduct/:id", updateProduct);
productRouter.get("/getProducts", getProducts);
productRouter.post("/addProducts", addMultipleProducts);
productRouter.get("/getBrands", getBrands);
productRouter.get("/:category", getProductByCategory);
productRouter.get("/product/:id", getProductById);
productRouter.get("/cart/:id", getProducts);
productRouter.get("/brands/:brand", getProductByBrand);
productRouter.get("/categories/:subCategory", getProductsBySubCategory);
productRouter.get("/", getCounts);
productRouter.get("/vendor/counts/:id", getCountsForVendor);
productRouter.get("/admin/products/all", getProductsForAdmin); 
productRouter.get("/admin/products", getProductsForAdminApproval); 
productRouter.post("/admin/approve/:id", approveProduct);
productRouter.get("/vendor/:id", getProductsByVendor);
productRouter.post("/reviews/add", addReviewToProduct);
productRouter.post("/reviews/edit", editReviewForProduct);
productRouter.post("/reviews/delete",deleteReviewFromProduct);
productRouter.get("/search/:search", searchProducts);
