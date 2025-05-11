import { Router } from 'express';
import Meeting from '../models/meeting.js';
import { error, getLastId } from '../utils.js';
const router = Router();

router.get('/', async (req, res) => {
  const items = await Meeting.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Meeting.findOne({ _id: req.params.id })
    .populate('client')
    .populate('service_provider');
  if (!item) {
    error(res, 'meeting.not-found', 404);
    return;
  }
  res.json(item);
});

router.post('/', async (req, res) => {
  const newId = await getLastId(Meeting) + 1;
  const item = await Meeting.create({ _id: newId, ...req.body });
  res.json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Meeting.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!item) {
    error(res, 'meeting.not-found', 404);
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Meeting.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    error(res, 'meeting.not-found', 404);
    return;
  }
  res.json();
});

export default router;
