const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Web Development',
    slug: 'web-development',
    icon: '💻',
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    name: 'Graphic Design',
    slug: 'graphic-design',
    icon: '🎨',
    isActive: true,
    isFeatured: true,
    order: 2
  },
  {
    name: 'Content Writing',
    slug: 'content-writing',
    icon: '✍️',
    isActive: true,
    order: 3
  }
];

async function seedCategories() {
  await mongoose.connect(process.env.MONGO_URI);
  await Category.deleteMany();
  await Category.insertMany(categories);
  console.log('✅ Categories seeded');
  process.exit();
}

seedCategories();
