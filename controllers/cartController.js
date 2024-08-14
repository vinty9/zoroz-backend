import carts from "../models/carts.js";
import products from "../models/products.js";

export const addToCart = async (req, res) => {
  try {
    const {
      product_id,
      quantity,
      customer_id,
      name,
      price,
      mrp,
      image,
      description,
      vendor_id,
      operation,
    } = req.body;

    const existingCart = await carts.findOne({ customer_id });

    if (existingCart) {
      const existingItem = existingCart.cart.find(
        (item) => item.product_id === product_id
      );
      if (existingItem) {
        if (operation === "add") {
          existingItem.quantity += quantity;
        } else if (operation === "remove") {
          existingItem.quantity -= quantity;
        }
      } else {
        existingCart.cart.push({
          product_id,
          quantity,
          name,
          price,
          mrp,
          image,
          description,
          vendor_id,
        });
      }

      await existingCart.save();

      return res.status(201).json({
        success: true,
        statusCode: 201,
        msg: "Product added to cart successfully",
      });
    } else {
      const newCart = new carts({
        customer_id,
        cart: [
          {
            product_id,
            quantity,
            name,
            price,
            mrp,
            image,
            description,
            vendor_id,
          },
        ],
      });

      await newCart.save();

      return res.status(201).json({
        success: true,
        statusCode: 201,
        msg: "Product added to cart successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductsFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the user's cart
    const cart = await carts.findOne({ customer_id: id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Cart not found",
      });
    }

    // Extract product IDs from the cart

    // Return the result
    return res.status(200).json({
      success: true,
      statusCode: 200,
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const manageQuantity = async (req, res) => {
  try {
    const { product, customer } = req.params;
    const { operation, quantity } = req.body;
    const cart = await carts.findOne({ customer_id: customer });
    if (!cart) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Cart not found",
      });
    }
    const productIndex = cart.cart.findIndex(
      (item) => item.product_id === product
    );
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Product not found in cart",
      });
    }
    const productData = cart.cart[productIndex];
    if (operation === "add") {
      productData.quantity += 1;
    } else if (operation === "remove") {
      if (quantity == 1) {
        cart.cart.splice(productIndex, 1); // Remove the product from the cart if quantity is 1
      } else {
        productData.quantity -= 1;
      }
    }
    await cart.save(); // Save the updated cart back to the database
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Quantity updated successfully",
      cart: cart.cart, // Optionally, you can return the updated cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};
