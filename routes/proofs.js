import { Router } from 'express';
import Proof from '../models/proof.js';
import { error, getLastId } from '../utils.js';
import { populateUser } from '../models/user.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await Proof.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await populateUser(Proof.findOne({ _id: req.params.id }));
  if (!item) {
    error(res, 'proof.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Proof) + 1;
  const item = await Proof.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Proof.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'proof.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Proof.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'proof.not-found', 404);
    return;
  }
  res.json();
});

export default router;
