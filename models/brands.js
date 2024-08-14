import mongoose from "mongoose";

const Brands = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: false,
  },
  sub_categories: {
    type: [String],
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Brands", Brands, "brands");
