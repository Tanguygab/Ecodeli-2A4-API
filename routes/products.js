import { Router } from 'express';
import Product from '../models/product.js';
import { error, getLastId } from '../utils.js';
const router = Router();

router.get('/', async (req, res) => {
  const items = await Product.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Product.findOne({ _id: req.params.id })
    .populate('size')
    .populate('seller')
    .populate('location');
  if (!item) {
    error(res, 'product.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Product) + 1;
  const item = await Product.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'product.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Product.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'product.not-found', 404);
    return;
  }
  res.json();
});

export default router;
