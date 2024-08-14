import banners from "../models/banners.js";

export const addBanner = async (req, res) => {
  try {
    const banner = req.body;
    const newBanner = new banners(banner);
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    const allBanners = await banners.findOne();
    res.status(200).json(allBanners);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = req.body;
    const updatedBanner = await banners.findOneAndUpdate({}, banner, {
      new: true,
    });
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
