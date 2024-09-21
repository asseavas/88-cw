import express from 'express';
import {ProductMutation} from '../types';
import {imagesUpload} from '../multer';
import Product from '../models/Product';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter)
      .populate('category', 'title')
      .populate('user', 'nickname phone');

    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product === null) {
      return res.status(404).send({error: 'Product not found'});
    }

    return res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
  try {
    const ProductMutation: ProductMutation = {
      category: req.body.category,
      user: req.user?._id,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : null,
    };

    if (!req.body.title || !req.body.description || !req.file?.filename || !req.body.price || !req.body.category) {
      return res.status(400).send({ error: 'All fields are required!' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const product = new Product(ProductMutation);
    await product.save();

    return res.send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid Task ID' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ error: 'Task not found' });
    }

    if (!product.user.equals(req.user._id)) {
      return res.status(403).send({ error: "You don't have permission to delete this task!" });
    }

    await Product.findByIdAndDelete(id);

    return res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;