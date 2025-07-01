import { Router } from 'express';
import Product from '../models/product.js';
import { error, find, getLastId, searchQuery, validToken } from '../utils.js'
import User, { populateUser } from '../models/user.js'
import ProductRequest from '../models/product_request.js'
import Location from '../models/location.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await populateUser(Product.find(), "seller")
    .populate('size')
    .populate('location');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await populateUser(Product.findOne({ _id: req.params.id }), "seller")
    .populate('size')
    .populate('location');
  if (!item) {
    error(res, 'product.not-found', 404);
    return;
  }
  res.json(item);
});

router.get('/sellers', async (req, res) => {
    res.json(await User.find({$or: [searchQuery(req, "input"), searchQuery(req, "input", "firstname")]}, {_id: 1, firstname: 1, name: 1}))
})

router.post('/', async (req, res) => {
  const newId = await getLastId(Product) + 1;
  const item = await Product.create({ _id: newId, ...req.body });
  res.json(item);
});

router.post('/:id/buy', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  const product = await find(res, Product, req.params.id, "product.not-found");
  if (product === null) return;

  const location = await find(res, Location, req.body.location, "location.not-found");
  if (location === null) return;

  const item = await ProductRequest.create({
    _id: await getLastId(ProductRequest) + 1,
    creation_date: Date.now(),
    delivery_location: location._id,
    receiver: user._id,
    product: product._id,
    amount: req.body.amount,
  });
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
