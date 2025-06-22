import { Router } from 'express';
import Contract from '../models/contract.js';
import { error, getLastId } from '../utils.js';
import { populateUser } from '../models/user.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await Contract.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await populateUser(Contract.findOne({ _id: req.params.id }));
  if (!item) {
    error(res, 'contract.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Contract) + 1;
  const item = await Contract.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Contract.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'contract.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Contract.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'contract.not-found', 404);
    return;
  }
  res.json();
});

export default router;
