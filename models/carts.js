import mongoose from "mongoose";

const Cart = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vendor_id: {
    type: String,
    required: true,
  },
});

const Carts = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
  },
  cart: {
    type: [Cart],
    required: true,
  },
});

export default mongoose.model("Carts", Carts, "carts");
