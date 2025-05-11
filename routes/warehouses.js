import { Router } from 'express';
import Warehouse from '../models/warehouse.js';
import { error, getLastId } from '../utils.js';
const router = Router();

router.get('/', async (req, res) => {
  const items = await Warehouse.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Warehouse.findOne({ _id: req.params.id })
    .populate('location');
  if (!item) {
    error(res, 'warehouse.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Warehouse) + 1;
  const item = await Warehouse.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Warehouse.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'warehouse.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Warehouse.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'warehouse.not-found', 404);
    return;
  }
  res.json();
});

export default router;
