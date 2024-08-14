import mongoose from "mongoose";

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: false, // Allow empty string
    default: "", // Set default value to empty string
  },
  email: {
    type: String,
    required: false, // Allow empty string
    default: "", // Set default value to empty string
  },
  phone: {
    type: Number,
    required: true, // Allow empty string
    // Set default value to empty string
  },
  address: {
    type: String,
    required: false, // Allow empty string
    default: "", // Set default value to empty string
  },
  city: {
    type: String,
    required: false, // Allow empty string
    default: "", // Set default value to empty string
  },
  state: {
    type: String,
    required: false, // Allow empty string
    default: "", // Set default value to empty string
  },
  pincode: {
    type: Number,
    required: false, // Allow empty string
    default: "", // Set default value to empty string
  },
  role: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", Users, "users");
