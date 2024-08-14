import mongoose from "mongoose";

const Payments = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  price: {
    type: Number,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Payments", Payments, "payments");
