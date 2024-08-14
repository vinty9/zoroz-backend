import mongoose from "mongoose";

const Orders = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  vendor_id: {
    type: String,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  vendor_approval: {
    type: Boolean,
    required: true,
  },
  admin_approval: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Orders", Orders, "orders");
