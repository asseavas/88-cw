import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import User from './models/User';
import Product from './models/Product';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const user1 = new User({
    username: 'Лариса',
    password: '1nkn$jb',
    nickname: 'Ларисочка Гузеева',
    phone: '+7 889 8083 328'
  });

  const user2 = new User({
    username: 'cat_01',
    password: '5nd9$ld',
    nickname: 'Котик',
    phone: '+996 550 440 390'
  });

  const user3 = new User({
    username: 'vladimir',
    password: 'bmeU)$l6',
    nickname: 'Вован',
    phone: '+88 909 09809'
  });

  user1.generateToken();
  await user1.save();

  user2.generateToken();
  await user2.save();

  user3.generateToken();
  await user3.save();

  const [
    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
  ] = await Category.create([
    {
      title: 'Недвижимость',
    },
    {
      title: 'Личные вещи',
    },
    {
      title: 'Транспорт',
    },
    {
      title: 'Животные',
    },
    {
      title: 'Мебель',
    }
  ]);

  await Product.create([
    {
      category: cat1,
      user: user1,
      title: 'Квартира в центре города',
      description: 'Продаётся уютная квартира в самом центре города с живописным видом на парк. Просторная планировка включает светлую гостиную, две спальни и кухню, где будет удобно готовить для всей семьи. В шаговой доступности магазины, школы и остановки общественного транспорта, что делает жизнь максимально комфортной. Отличный вариант для тех, кто ценит удобство и стиль городской жизни.',
      price: 1200000,
      image: 'fixtures/apartment.jpg',
    },
    {
      category: cat2,
      user: user2,
      title: 'Куртка зимняя',
      description: 'Стильная зимняя куртка, очень тёплая и удобная. Размер L, в отличном состоянии.',
      price: 4500,
      image: 'fixtures/jacket.jpg',
    },
    {
      category: cat2,
      user: user2,
      title: 'Сумка кожаная',
      description: 'Элегантная кожаная сумка. Подходит для повседневного использования и особых случаев.',
      price: 3500,
      image: 'fixtures/bag.jpg',
    },
    {
      category: cat2,
      user: user2,
      title: 'Часы наручные',
      description: 'Мужские наручные часы с классическим дизайном. Идеальны для деловых встреч.',
      price: 7500,
      image: 'fixtures/watch.jpg',
    },
    {
      category: cat3,
      user: user3,
      title: 'Мотоцикл Honda CB650R',
      description: 'Мотоцикл Honda CB650R в идеальном состоянии, готовый к новым приключениям. Обслуживался только у официального дилера, поэтому все сервисные отметки в порядке. Пробег всего 1500 км, и он готов к долгим поездкам по живописным маршрутам. Идеальный выбор для любителей скорости и стиля, с мощным двигателем и современным дизайном. Не упустите возможность стать обладателем этого великолепного мотоцикла!',
      price: 600000,
      image: 'fixtures/motorcycle.webp',
    },
    {
      category: cat4,
      user: user3,
      title: 'Котик',
      description: 'Милый котик ищет добрые руки. Возраст 2 года, привит и стерилизован. Очень ласковый и игривый, обожает играть с игрушками и проводить время рядом с людьми. Он станет верным другом и отличным компаньоном для всей семьи.',
      price: 5000,
      image: 'fixtures/cat.jpg',
    },
    {
      category: cat5,
      user: user1,
      title: 'Диван раскладной',
      description: 'Удобный раскладной диван с мягкой обивкой. Идеально подходит для гостей и для комфортного отдыха.',
      price: 15000,
      image: 'fixtures/sofa.jpg',
    },
  ]);

  await db.close();
};

run().catch(console.error);