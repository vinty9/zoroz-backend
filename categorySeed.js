import mongoose from 'mongoose';
import Categories from './models/categories.js';

const MONGODB_URI = 'mongodb+srv://goel85749:Sidhu295@zozor.suk46dn.mongodb.net/products?retryWrites=true&w=majority&appName=zozor';

const categories = [
  {
    name: 'Mobile Display Screens',
    sub_categories: [
      {
        name: 'Screens for iPhone',
        image: '/assets/images/mobile.png',
      },
      {
        name: 'Screens for Samsung',
        image: '/assets/images/mobile.png',
      },
    ],
  },
  {
    name: 'Mobile Accessories',
    sub_categories: [
      {
        name: 'Chargers',
        image: '/assets/images/mobilea.png',
      },
      {
        name: 'Cases',
        image: '/assets/images/mobilea.png',
      },
    ],
  },
  {
    name: 'Mobile Spare Parts',
    sub_categories: [
      {
        name: 'Batteries',
        image: '/assets/images/mobiles.png',
      },
      {
        name: 'Cameras',
        image: '/assets/images/mobiles.png',
      },
    ],
  },
  {
    name: 'Mobile Tool Kits',
    sub_categories: [
      {
        name: 'Repair Kits',
        image: '/assets/images/mobilet.png',
      },
      {
        name: 'Screwdriver Sets',
        image: '/assets/images/mobilet.png',
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    await Categories.deleteMany({});

    await Categories.insertMany(categories);
    console.log('Database seeded with categories data');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

seedDB();
