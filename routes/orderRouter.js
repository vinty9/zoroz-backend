import express from "express";
import {
  addMultipleOrders,
  addOrder,
  approveOrderByAdmin,
  approveOrderByVendor,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersById,
  getOrdersForAdmin,
  getOrdersForVendor,
  validatePayment,
} from "../controllers/orderController.js";

export const orderRouter = express.Router();
orderRouter.post("/add", addOrder);
orderRouter.post("/add-multiple", addMultipleOrders);
orderRouter.get("/get", getOrders);
orderRouter.get("/get/:id", getOrdersById);
orderRouter.get("/get/single/:orderId",getOrderById);
orderRouter.post("/admin/:id", approveOrderByAdmin);
orderRouter.post("/vendor/:id", approveOrderByVendor);
orderRouter.get("/admin/get", getOrdersForAdmin);
orderRouter.get("/vendor/get/:id", getOrdersForVendor);
orderRouter.post("/paymentCapture", validatePayment);
orderRouter.post("/delete",deleteOrder);
