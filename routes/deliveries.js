import { Router } from 'express';
import Delivery from '../models/delivery.js';
import { error, getLastId } from '../utils.js';
import { populateUser } from '../models/user.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await Delivery.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await populateUser(Delivery.findOne({ _id: req.params.id }),'deliveryman');
  if (!item) {
    error(res, 'delivery.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Delivery) + 1;
  const item = await Delivery.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Delivery.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'delivery.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Delivery.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'delivery.not-found', 404);
    return;
  }
  res.json();
});

export default router;
