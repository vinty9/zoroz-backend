import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    rating: req.body.rating,
    reviewCount: req.body.reviewCount,
    description: req.body.description,
    brand: req.body.brand,
    originalPrice: req.body.originalPrice,
    discountPercentage: req.body.discountPercentage,
    quantity: req.body.quantity,
    category:req.body.category,
    stock:req.body.stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
 