import mongoose from "mongoose";

const Banner = new mongoose.Schema({
  bannerImage: {
    type: String,
    required: true,
  },
  bannerLink: {
    type: String,
    required: true,
  },
});

const Chip = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  offerString: {
    type: String,
    required: true,
  },
  chipLink: {
    type: String,
    required: true,
  },
});

const Banners = new mongoose.Schema({
  banners: {
    type: [Banner],
    required: true,
  },
  offerImages: {
    type: [Banner],
    required: true,
  },
  offerChips: {
    type: [Chip],
    required: true,
  },
});

export default mongoose.model("Banners", Banners, "banners");
