import { Router } from 'express';
import Bill from '../models/bill.js';
import { error, getLastId } from '../utils.js';
const router = Router();

router.get('/', async (req, res) => {
  const items = await Bill.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Bill.findOne({ _id: req.params.id })
    .populate('buyer')
    .populate('receiver');
  if (!item) {
    error(res, 'bill.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Bill) + 1;
  const item = await Bill.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Bill.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'bill.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Bill.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'bill.not-found', 404);
    return;
  }
  res.json();
});

export default router;
