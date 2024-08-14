import express from 'express';
import multer from 'multer';
import Order from '../models/Order.js';
import path from 'path';  
import mongoose from 'mongoose'; 

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });





router.post('/orders', upload.array('images[]'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Files:', req.files);
    const { products, addresses, discount, total, coupon, paymentMethod } = req.body;

    if (!products || !addresses) {
      throw new Error('Products or addresses data is missing');
    }

    const productsArray = JSON.parse(products); 
    const addressesArray = JSON.parse(addresses);

    // const order = new Order({
    //   products: productsArray,
    //   addresses: addressesArray,
    //   discount: Number(discount),
    //   total: Number(total),
    //   coupon,
    //   paymentMethod,
    //   images: req.files.map(file => file.path)
    // });

    // Create order with size and color
    const order = new Order({
      products: productsArray.map(product => ({
        ...product,
        selectedSize: product.selectedSize,
        selectedColor: product.selectedColor
      })),
      addresses: addressesArray,
      discount: Number(discount),
      total: Number(total),
      coupon,
      paymentMethod,
      images: req.files.map(file => file.path)
    });

    const savedOrder = await order.save();

    res.status(200).json({ 
      message: 'Order placed successfully!',
      orderId: savedOrder._id 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid orderId format' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;



