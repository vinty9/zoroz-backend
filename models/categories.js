import mongoose from "mongoose";

const SubCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Categories = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sub_categories: {
    type: [SubCategory],
    required: true,
  },
});
 
export default mongoose.model("Categories", Categories, "categories");
