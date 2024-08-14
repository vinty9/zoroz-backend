  import mongoose from 'mongoose';
  import Brands from './models/brands.js'; 

  const brands = [
    {
      name: 'Brand 1',
      categories: ['Mobile Tools'],
      sub_categories: ['Tool Kits'],
      image: '/assets/images/image1.png'
    },
    {
      name: 'Brand 2',
      categories: ['Mobile Accessories'],
      sub_categories: ['Display Screens'],
      image: '/assets/images/image2.png'
    },
    {
      name: 'Brand 3',
      categories: ['Mobile Spare Parts'],
      sub_categories: ['Spare Parts'],
      image: '/assets/images/image3.png'
    },
    {
      name: 'Brand 4',
      categories: ['Accessories'],
      sub_categories: ['Tool Kits'],
      image: '/assets/images/image1.png'
    },
    {
      name: 'Brand 5',
      categories: ['Accessories'],
      sub_categories: ['Display Screens'],
      image: '/assets/images/image2.png'
    },
  ];

  const MONGODB_URI = 'mongodb+srv://goel85749:Sidhu295@zozor.suk46dn.mongodb.net/products?retryWrites=true&w=majority&appName=zozor';

  const seedDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');

      await Brands.deleteMany({}); 
      await Brands.insertMany(brands); 
      console.log('Database seeded with brands');

      mongoose.connection.close();
    } catch (error) {
      console.error('Error seeding database:', error.message);
    }
  };

  seedDB();
