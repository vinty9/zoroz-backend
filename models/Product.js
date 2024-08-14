import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  rating: Number,
  reviewCount: Number,
  description: String,
  brand: String,
  originalPrice: Number,
  discountPercentage: Number,
  quantity: Number,
  category:String,
  stock:Number
});

const Product = mongoose.model('Product', productSchema);

export default Product;



// import mongoose from 'mongoose';

// const Specification = new mongoose.Schema({
//   feature: {
//     type: String,
//     required: true,
//   },
//   value: {
//     type: String,
//     required: true,
//   },
// });



// const productSchema = new mongoose.Schema({
//   vendor_id: {
//     type: String,
//     ref: 'Vendor',
//     required: false,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   sub_category: {
//     type: String,
//     required: false,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true
//   },
//   reviewcount: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   originalPrice: {
//     type: Number,
//     required: true
//   },
//   discountPercentage: {
//     type: Number,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   features: {
//     type: [String],
//     required: false,
//   },
//   specifications: {
//     type: [Specification],
//     required: false,
//   },
//   video_link: {
//     type: String,
//     required: false,
//   },

//   benefits: {
//     type: [String],
//     required: false,
//   },
//   warranty: {
//     type: String,
//     required: false,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   admin_approval: {
//     type: Boolean,
//     required: true,
//     default: true,
//   },
// });

// const Product = mongoose.model('Product', productSchema);

// export default Product;
