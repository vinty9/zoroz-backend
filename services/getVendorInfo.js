import vendor from "../models/vendor.js";

export const getVendorInfo = async (userId) => {
  try {
    const userData = await vendor.findById(userId);
    if (!userData) {
      console.log("User does not exist");
      return null;
    }
    console.log("User fetched successfully", userData);
    return userData;
  } catch (err) {
    console.error("Error during fetching user:", err);
  }
};
