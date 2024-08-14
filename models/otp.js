import mongoose from "mongoose";

const Otps = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  loginOtp: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Otps", Otps, "otps");
