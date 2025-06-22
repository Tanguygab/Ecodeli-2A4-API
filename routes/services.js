import { Router } from 'express';
import Service from '../models/service.js';
import { error, getLastId } from '../utils.js';
import { populateUser } from '../models/user.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await Service.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await populateUser(populateUser(Service.findOne({ _id: req.params.id })),'actor');
  if (!item) {
    error(res, 'service.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Service) + 1;
  const item = await Service.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Service.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'service.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Service.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'service.not-found', 404);
    return;
  }
  res.json();
});

export default router;
