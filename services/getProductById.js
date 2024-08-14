import products from "../models/products.js";

export const getProductById = async (productId) => {
  try {
    const product = await products.findById(productId);
    return product;
  } catch (error) {
    throw new Error("Error fetching product details");
  }
};
