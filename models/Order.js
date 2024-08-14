import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  products: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      rating: { type: Number },
      reviewCount: { type: Number },
      description: { type: String },
      brand: { type: String },
      originalPrice: { type: Number },
      discountPercentage: { type: Number },
      quantity: { type: Number, required: true },
      category: { type: String },
      stock: { type: Number },
      selectedSize: { type: String }, 
      selectedColor: { type: String }  
    }
  ],
  addresses: [ 
    {
      _id: { type: String },
      name: { type: String, required: true },
      email:{type:String},
      room: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      pin: { type: String, required: true },
      phone: { type: String, required: true }
    }
  ],
  discount: { type: Number },
  total: { type: Number, required: true },
  coupon: { type: String },
  paymentMethod: { type: String, required: true },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;




// import mongoose from 'mongoose';

// const ProductSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String },
//   rating: { type: Number },
//   reviewCount: { type: Number },
//   description: { type: String },
//   brand: { type: String },
//   originalPrice: { type: Number },
//   discountPercentage: { type: Number },
//   quantity: { type: Number, required: true },
//   category: { type: String },
//   stock: { type: Number },
//   selectedSize: { type: String }, 
//   selectedColor: { type: String }
// });

// const AddressSchema = new mongoose.Schema({
//   _id: { type: String },
//   name: { type: String, required: true },
//   email: { type: String },
//   room: { type: String },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String },
//   country: { type: String, required: true },
//   pin: { type: String, required: true },
//   phone: { type: String, required: true }
// });

// const OrderSchema = new mongoose.Schema({
//   products: [ProductSchema], 
//   addresses: [AddressSchema], 
//   discount: { type: Number },
//   total: { type: Number, required: true },
//   coupon: { type: String },
//   paymentMethod: { type: String, required: true },
//   images: [String],
//   createdAt: { type: Date, default: Date.now },
  
//   // removed required and not posted yet due to admin feature
//   customer_id: { type: String },
//   vendor_id: { type: String },
//   vendor_approval: { type: Boolean },
//   admin_approval: { type: Boolean },
//   status: { type: String },
//   transaction_id: { type: String }
// });

// const Order = mongoose.model('Order', OrderSchema);

// export default Order;
