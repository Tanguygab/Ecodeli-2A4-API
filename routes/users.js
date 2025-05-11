import { Router } from 'express';
import User from '../models/user.js';
import { error, getLastId } from '../utils.js';
const router = Router();

router.get('/', async (req, res) => {
  const items = await User.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await User.findOne({ _id: req.params.id })
    .populate('subscription')
    .populate('role');
  if (!item) {
    error(res, 'user.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(User) + 1;
  const item = await User.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'user.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await User.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'user.not-found', 404);
    return;
  }
  res.json();
});

export default router;
