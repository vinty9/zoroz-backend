import coupons from "../models/coupons.js";
 
export const addCoupon = async (req, res) => {
  try {
    const { name, code, discount, discount_text, startDate, expiryDate } = req.body;

    // Check if a coupon with the same code already exists
    const existingCoupon = await coupons.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({
        message: "Coupon code already exists",
        data: existingCoupon,
      });
    }

    const coupon = new coupons({
      name,
      code,
      discount,
      discount_text,
      startDate,
      expiryDate,
    });
    await coupon.save();
    res.status(201).json({
      message: "Coupon added successfully",
      data: coupon,
    });
  } catch (error) {
    // Check for duplicate key error
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate key error: Coupon code already exists." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const couponsData = await coupons.find({});
    res.status(200).json({ data: couponsData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
