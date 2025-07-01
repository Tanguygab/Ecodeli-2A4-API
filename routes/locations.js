import { Router } from 'express';
import { find, getLastId, validToken } from '../utils.js'
import Location from '../models/location.js'
const router = Router();

router.get('/', async (req, res) => {
  const items = await Location.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = find(req, Location, req.params.id, "location.not-found");
  if (item === null) return item;
  res.json(item);
});

router.post('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  const location = req.body.location;
  const existing = await Location.findOne({
    user: user._id,
    city: location.city,
    zipcode: location.zipcode,
    address: location.address,
  });
  if (existing) {
    res.json(existing);
    return;
  }

  const item = await Location.create({
    _id: await getLastId(Location) + 1,
    user: user._id,
    city: location.city,
    zipcode: location.zipcode,
    address: location.address,
  });
  res.json(item);
});

export default router;
