import { Router } from 'express';
import Notification from '../models/notification.js';
import { error, getLastId } from '../utils.js';
import { populateUser } from '../models/user.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await Notification.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await populateUser(Notification.findOne({ _id: req.params.id }));
  if (!item) {
    error(res, 'notification.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Notification) + 1;
  const item = await Notification.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Notification.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'notification.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Notification.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'notification.not-found', 404);
    return;
  }
  res.json();
});

export default router;
