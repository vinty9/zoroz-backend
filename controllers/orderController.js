import orders from "../models/orders.js";
import { validateFields } from "../services/validateFields.js";
import user from "../models/user.js";
import products from "../models/products.js";
import { getProductById } from "../services/getProductById.js";
import { razorpay } from "../services/razorpay.js";
import Razorpay from "razorpay";
import { generatedSignature } from "../services/generatedSignature.js";
export const addOrder = async (req, res) => {
  try {
    const {
      product_id,
      quantity,
      customer_id,
      vendor_id,
      vendor_approval,
      price,
      shipping_address,
      payment_method,
      admin_approval,
      transaction_id,
      status,
    } = req.body;
    console.log(req.body);

    if (payment_method == "Online Payment") {
      const razorpay = new Razorpay({
        key_id: "rzp_test_fq5x5RVk096MtS",
        key_secret: "yVawj4Qw0zHx96URPFwG0YH1",
      });
      const options = {
        amount: price,
        currency: "INR",
        receipt: "rcp1",
      };
      try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        // if (response) {
        //   const responseInConfirmation = await validatePayment(req, res);
        // }
        return res.json({
          order_id: response.id,
          currency: response.currency,
          amount: response.amount,
        });
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    } else {
      const missingFields = validateFields(req.body);
      if (missingFields) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          msg: `Please enter ${missingFields.join(", ")}`,
        });
      }

      const order = new orders({
        product_id: product_id,
        quantity: quantity,
        customer_id: customer_id,
        vendor_id: vendor_id,
        shipping_address: shipping_address,
        price: price,
        vendor_approval: vendor_approval,
        payment_method: payment_method,
        admin_approval: admin_approval,
        transaction_id: transaction_id,
        status: status,
      });
      await order.save();
      return res.status(201).json({
        success: true,
        statusCode: 201,
        msg: "Order added successfully",
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

export const addMultipleOrders = async (req, res) => {
  try {
    const ordersData = req.body; // Assuming req.body is an array of orders
    console.log(ordersData);
    if (
      !Array.isArray(ordersData.ordersData) ||
      ordersData.ordersData.length === 0
    ) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Please provide an array of orders",
      });
    }
    if (ordersData.payment_method === "Online Payment") {
      const razorpay = new Razorpay({
        key_id: "rzp_test_fq5x5RVk096MtS",
        key_secret: "yVawj4Qw0zHx96URPFwG0YH1",
      });
      const amount = Math.round(Number(ordersData.totalAmount) * 100);
      const options = {
        amount: amount,
        currency: "INR",
        receipt: "rcp1",
      };
      try {
        const response = await razorpay.orders.create(options);
        // if (response) {
        //   const responseInConfirmation = await validatePayment(req, res);
        // }
        return res.json({
          order_id: response.id,
          currency: response.currency,
          amount: response.amount,
        });
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    } else {
      const errors = [];
      const successfulInsertions = [];

      // Loop through each order data
      for (const orderData of ordersData.ordersData) {
        const {
          product_id,
          quantity,
          customer_id,
          vendor_id,
          vendor_approval,
          price,
          shipping_address,
          payment_method,
          admin_approval,
          status,
          transaction_id,
        } = orderData;

        // Validate fields for each order
        const missingFields = validateFields(orderData);
        if (missingFields) {
          errors.push({
            orderData,
            error: `Please enter ${missingFields.join(", ")}`,
          });
          continue; // Move to the next iteration if there are missing fields
        }

        // Create new order instance
        const order = new orders({
          product_id,
          quantity,
          customer_id,
          vendor_id,
          shipping_address,
          price,
          vendor_approval,
          payment_method,
          admin_approval,
          transaction_id,
          status,
        });

        // Save the order
        await order.save();
        successfulInsertions.push(orderData);
      }

      // Return response
      return res.status(201).json({
        success: true,
        statusCode: 201,
        msg: "Orders added successfully",
        errors,
        successfulInsertions,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    // Find all orders
    const ordersList = await orders.find();

    // Extract unique customer IDs from orders
    const customerIds = Array.from(
      new Set(ordersList.map((order) => order.customer_id))
    );

    // Fetch customer details for each customer ID
    const customersPromises = customerIds.map(async (customerId) => {
      const customer = await user.findOne(
        { _id: customerId },
        {
          name: 1,
          email: 1,
          phone: 1,
          state: 1,
          city: 1,
          address: 1,
          pincode: 1,
        }
      );
      return { customerId, customer };
    });

    // Wait for all customer details to be fetched
    const customers = await Promise.all(customersPromises);

    // Fetch product details for each order
    const productIds = Array.from(
      new Set(ordersList.map((order) => order.product_id))
    );
    const productsPromises = productIds.map(async (productId) => {
      const product = await products.findOne({ _id: productId });
      return { productId, product };
    });

    // Wait for all product details to be fetched
    const productsData = await Promise.all(productsPromises);

    // Map orders with customer and product details
    const ordersWithDetails = ordersList.map((order) => {
      const customer = customers.find(
        (c) => c.customerId === order.customer_id
      );
      const product = productsData.find(
        (p) => p.productId === order.product_id
      );
      return {
        ...order.toObject(),
        customer: customer ? customer.customer : null,
        product: product ? product.product : null,
      };
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: ordersWithDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getOrdersById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "User ID is missing or invalid",
      });
    }
    // Find orders for the specified user
    const ordersForUser = await orders.find({ customer_id: id });

    // Fetch user details
    const userData = await user.findOne(
      { _id: id },
      { name: 1, email: 1, phone: 1, state: 1, city: 1, address: 1, pincode: 1 }
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "User not found",
      });
    }

    // Fetch product details for each order
    const ordersWithProductDetails = await Promise.all(
      ordersForUser.map(async (order) => {
        const product = await getProductById(order.product_id);
        return { ...order.toObject(), product };
      })
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        user: userData,
        orders: ordersWithProductDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const approveOrderByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orders.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Order not found",
      });
    }
    order.admin_approval = true;
    await order.save();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Order approved by admin",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const approveOrderByVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orders.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Order not found",
      });
    }
    order.vendor_approval = true;
    order.status = "Shipped";
    await order.save();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Order approved by Vendor",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getOrdersForVendor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find orders for the vendor with vendor_approval false
    const ordersList = await orders.find({
      vendor_id: id,
      admin_approval: true,
    });

    // Fetch customer and product details for each order
    const customersPromises = ordersList.map(async (order) => {
      const customer = await user.findOne(
        { _id: order.customer_id },
        {
          name: 1,
          email: 1,
          phone: 1,
          state: 1,
          city: 1,
          address: 1,
          pincode: 1,
        }
      );
      const product = await products.findOne({ _id: order.product_id });
      return {
        ...order.toObject(),
        customer: customer ? customer : null,
        product: product ? product : null,
      };
    });

    // Wait for all customer and product details to be fetched
    const ordersWithDetails = await Promise.all(customersPromises);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: ordersWithDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getOrdersForAdmin = async (req, res) => {
  try {
    // Find all orders with vendor approval
    const ordersList = await orders.find({});
    if (!ordersList.length) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "No orders found",
      });
    }

    // Fetch customer and product details for each order
    const ordersWithDetails = await Promise.all(
      ordersList.map(async (order) => {
        try {
          console.log(order.product_id);
          const product = await products.findOne({ _id: order.product_id });
          console.log(product);
          // Fetch customer details
          const customer = await user.findById(order.customer_id, {
            name: 1,
            email: 1,
            phone: 1,
            state: 1,
            city: 1,
            address: 1,
            pincode: 1,
          });

          // Fetch product details

          // Construct the response object
          return {
            ...order.toObject(),
            customer: customer,
            product: product,
          };
        } catch (err) {
          console.error(`Error fetching details for order ${order._id}:`, err);
          return {
            ...order.toObject(),
            customer: null,
            product: null,
          };
        }
      })
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: ordersWithDetails,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

export const validatePayment = async (req, res) => {
  // do a validation
  const { orderCreationId, razorpayPaymentId, razorpaySignature, ordersData } =
    req.body;
  console.log(orderCreationId, razorpayPaymentId, razorpaySignature);
  const signature = generatedSignature(orderCreationId, razorpayPaymentId);
  console.log(signature);
  if (signature !== razorpaySignature) {
    return res
      .status(400)
      .json({ message: "payment verification failed", isOk: false });
  }
  const successfulInsertions = [];

  // Loop through each order data
  for (const orderData of ordersData) {
    const {
      product_id,
      quantity,
      customer_id,
      vendor_id,
      vendor_approval,
      price,
      shipping_address,
      payment_method,
      admin_approval,
      transaction_id,
      status,
    } = orderData;

    // Validate fields for each order
    const missingFields = validateFields(orderData);
    if (missingFields) {
      errors.push({
        orderData,
        error: `Please enter ${missingFields.join(", ")}`,
      });
      continue; // Move to the next iteration if there are missing fields
    }

    // Create new order instance
    const order = new orders({
      product_id,
      quantity,
      customer_id,
      vendor_id,
      shipping_address,
      price,
      vendor_approval,
      payment_method,
      admin_approval,
      transaction_id: razorpayPaymentId,
      status,
    });

    // Save the order
    await order.save();
    successfulInsertions.push(orderData);
  }

  return res
    .status(200)
    .json({ message: "payment verified successfully", isOk: true });
};

export const deleteOrder = async (req, res) => {
  try {
    const { order_id, customer_id } = req.body;

    // Validate required fields
    if (!order_id || !customer_id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Please provide both order_id and customer_id",
      });
    }

    // Find the order by id
    const order = await orders.findById(order_id);

    // Check if order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Order not found",
      });
    }

    // Check if the customer_id matches
    if (order.customer_id.toString() !== customer_id) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        msg: "Unauthorized: customer_id does not match the order",
      });
    }

    // Delete the order
    await orders.findByIdAndDelete(order_id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error,
    });
  }
};

export const getOrderById = async (req,res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Order ID is missing or invalid",
      });
    }

    // Find the order by ID
    const order = await orders.findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Order not found",
      });
    }

    // Fetch user details associated with the order
    const userData = await user.findOne(
      { _id: order.customer_id },
      { name: 1, email: 1, phone: 1, state: 1, city: 1, address: 1, pincode: 1 }
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "User not found",
      });
    }

    // Fetch product details for the order
    const product = await getProductById(order.product_id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        order: order.toObject(),
        user: userData,
        product,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};
