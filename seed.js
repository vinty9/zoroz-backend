import mongoose from 'mongoose';
import Product from './models/Product.js'; 

const products = [
  {
    name: 'Product 1',
    price: 1000,
    image: '/assets/images/product.jpg',
    rating: 4.5,
    reviewCount: 10,
    description: 'Description of Product 1',
    brand: 'Brand 1',
    originalPrice: 1200,
    discountPercentage: 20,
    quantity: 1,
    category: 'Mobile Tool Kits', 
    stock: 50
  },
  {
    name: 'Product 2',
    price: 1500,
    image: '/assets/images/product.jpg',
    rating: 4.0,
    reviewCount: 8,
    description: 'Description of Product 2',
    brand: 'Brand 2',
    originalPrice: 1800,
    discountPercentage: 15,
    quantity: 1,
    category: 'Mobile Display Screens', 
    stock: 30 
  },
  {
    name: 'Product 3',
    price: 2000,
    image: '/assets/images/product.jpg',
    rating: 4.7,
    reviewCount: 15,
    description: 'Description of Product 3',
    brand: 'Brand 3',
    originalPrice: 2200,
    discountPercentage: 10,
    quantity: 1,
    category: 'Mobile Spare Parts', 
    stock: 20 
  },
  {
    name: 'Product 4',
    price: 2500,
    image: '/assets/images/product.jpg',
    rating: 4.3,
    reviewCount: 20,
    description: 'Description of Product 4',
    brand: 'Brand 4',
    originalPrice: 2800,
    discountPercentage: 25,
    quantity: 1,
    category: 'Accessories', 
    stock: 10 
  },
  {
    name: 'Product 5',
    price: 3000,
    image: '/assets/images/product.jpg',
    rating: 4.8,
    reviewCount: 30,
    description: 'Description of Product 5',
    brand: 'Brand 5',
    originalPrice: 3500,
    discountPercentage: 30,
    quantity: 1,
    category: 'Accessories', 
    stock: 5 
  },
];

const MONGODB_URI = 'mongodb+srv://goel85749:Sidhu295@zozor.suk46dn.mongodb.net/products?retryWrites=true&w=majority&appName=zozor';

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    await Product.deleteMany({});

    await Product.insertMany(products);
    console.log('Database seeded with sample data');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

seedDB();




// import mongoose from 'mongoose';
// import Product from './models/Product.js'; 

// const products = [
//   {
//     vendor_id: '64b8f8192a8c312001a03e5c', // Example vendor ObjectId
//     category: 'Mobile Tools',
//     sub_category: 'Tool Kits',
//     name: 'Product 1',
//     image: '/assets/images/product1.jpg',
//     price: 1000,
//     mrp: 1200,
//     stock_count: 50,
//     description: 'Description of Product 1',
//     features: ['Compact design', 'Durable material'],
//     specifications: [
//       { feature: 'Material', value: 'Aluminum' },
//       { feature: 'Size', value: 'Small' },
//     ],
//     video_link: 'https://example.com/product1-video.mp4',
//     reviews: [
//       {
//         user_id: 'user1',
//         rating: 4.5,
//         title: 'Great Product',
//         review: 'Really liked the quality and performance.',
//         date: new Date(),
//       },
//     ],
//     benefits: ['1-year warranty', 'Free returns'],
//     warranty: '1 Year',
//     brand: '64b8f8192a8c312001a03e5d', // Example brand ObjectId
//     admin_approval: true,
//   },
//   {
//     vendor_id: '64b8f8192a8c312001a03e5c', // Example vendor ObjectId
//     category: 'Mobile Accessories',
//     sub_category: 'Display Screens',
//     name: 'Product 2',
//     image: '/assets/images/product2.jpg',
//     price: 1500,
//     mrp: 1800,
//     stock_count: 30,
//     description: 'Description of Product 2',
//     features: ['High resolution', 'Easy installation'],
//     specifications: [
//       { feature: 'Resolution', value: '1920x1080' },
//       { feature: 'Compatibility', value: 'Model X' },
//     ],
//     video_link: 'https://example.com/product2-video.mp4',
//     reviews: [
//       {
//         user_id: 'user2',
//         rating: 4.0,
//         title: 'Good Quality',
//         review: 'The screen is vibrant and clear.',
//         date: new Date(),
//       },
//     ],
//     benefits: ['1-year warranty', 'Free shipping'],
//     warranty: '1 Year',
//     brand: '64b8f8192a8c312001a03e5e', // Example brand ObjectId
//     admin_approval: true,
//   },
//   {
//     vendor_id: '64b8f8192a8c312001a03e5c', // Example vendor ObjectId
//     category: 'Mobile Parts',
//     sub_category: 'Spare Parts',
//     name: 'Product 3',
//     image: '/assets/images/product3.jpg',
//     price: 2000,
//     mrp: 2200,
//     stock_count: 20,
//     description: 'Description of Product 3',
//     features: ['High durability', 'Easy to install'],
//     specifications: [
//       { feature: 'Material', value: 'Plastic' },
//       { feature: 'Compatibility', value: 'Model Y' },
//     ],
//     video_link: 'https://example.com/product3-video.mp4',
//     reviews: [
//       {
//         user_id: 'user3',
//         rating: 4.7,
//         title: 'Excellent Spare Part',
//         review: 'Perfect fit for my device.',
//         date: new Date(),
//       },
//     ],
//     benefits: ['1-year warranty', 'Free replacement'],
//     warranty: '1 Year',
//     brand: '64b8f8192a8c312001a03e5f', // Example brand ObjectId
//     admin_approval: true,
//   },
//   {
//     vendor_id: '64b8f8192a8c312001a03e5c', // Example vendor ObjectId
//     category: 'Mobile Accessories',
//     sub_category: 'Accessories',
//     name: 'Product 4',
//     image: '/assets/images/product4.jpg',
//     price: 2500,
//     mrp: 2800,
//     stock_count: 10,
//     description: 'Description of Product 4',
//     features: ['Stylish design', 'High quality'],
//     specifications: [
//       { feature: 'Material', value: 'Leather' },
//       { feature: 'Color', value: 'Black' },
//     ],
//     video_link: 'https://example.com/product4-video.mp4',
//     reviews: [
//       {
//         user_id: 'user4',
//         rating: 4.3,
//         title: 'Stylish and Durable',
//         review: 'The product looks great and feels sturdy.',
//         date: new Date(),
//       },
//     ],
//     benefits: ['1-year warranty', 'Free shipping'],
//     warranty: '1 Year',
//     brand: '64b8f8192a8c312001a03e6a', // Example brand ObjectId
//     admin_approval: true,
//   },
//   {
//     vendor_id: '64b8f8192a8c312001a03e5c', // Example vendor ObjectId
//     category: 'Mobile Accessories',
//     sub_category: 'Accessories',
//     name: 'Product 5',
//     image: '/assets/images/product5.jpg',
//     price: 3000,
//     mrp: 3500,
//     stock_count: 5,
//     description: 'Description of Product 5',
//     features: ['Premium quality', 'Long-lasting'],
//     specifications: [
//       { feature: 'Material', value: 'Silicone' },
//       { feature: 'Size', value: 'Medium' },
//     ],
//     video_link: 'https://example.com/product5-video.mp4',
//     reviews: [
//       {
//         user_id: 'user5',
//         rating: 4.8,
//         title: 'Exceptional Quality',
//         review: 'The best accessory I have purchased.',
//         date: new Date(),
//       },
//     ],
//     benefits: ['1-year warranty', 'Free returns'],
//     warranty: '1 Year',
//     brand: '64b8f8192a8c312001a03e6b', // Example brand ObjectId
//     admin_approval: true,
//   },
// ];

// const MONGODB_URI = 'mongodb+srv://goel85749:Sidhu295@zozor.suk46dn.mongodb.net/products?retryWrites=true&w=majority&appName=zozor';

// const seedDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     await Product.deleteMany({});

//     await Product.insertMany(products);
//     console.log('Database seeded with sample data');

//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding database:', error.message);
//   }
// };

// seedDB();
