import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('categories');
    // await db.dropCollection('products');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [
    cat1,
    cat2,
    cat3,
    cat4,
    cat5
  ] = await Category.create({
    title: 'Недвижимость',
  }, {
    title: 'Личные вещи',
  }, {
    title: 'Транспорт',
  }, {
    title: 'Животные',
  }, {
    title: 'Мебель',
  });

  // await Product.create({
  //   title: 'Intel Core i9',
  //   price: 500,
  //   category: cpuCategory,
  //   image: 'fixtures/cpu.webp',
  // }, {
  //   title: 'Nvidia RTX 4090',
  //   price: 1200,
  //   category: gpuCategory,
  //   image: 'fixtures/gpu.jpg',
  // });

  // const user = new User({
  //   username: 'user',
  //   password: '1nkn$jb',
  // });
  //
  // user.generateToken();
  // await user.save();
  await db.close();
};

run().catch(console.error);