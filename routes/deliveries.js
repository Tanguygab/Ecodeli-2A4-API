import { Router } from 'express';
import Delivery from '../models/delivery.js';
import { error, getLastId, validToken } from '../utils.js'
const router = Router();

router.get('/', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  const filter = user.role.name === "admin" ? {} : { deliveryman: user._id }

  const items = await Delivery.aggregate()
    .match(filter)
    .lookup({
      from: "product_requests",
      localField: "_id",
      foreignField: "delivery",
      as: "products",
    })
    .addFields({
        first_product_date: { $min: "$products.date" },
        last_product_date: { $max: "$products.date" },
        products: { $size: "$products" }
    });
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  const filter = { _id: Number(req.params.id) }
  if (user.role.name !== "admin") filter["deliveryman"] = user._id

  const items = await Delivery.aggregate()
    .match(filter)
    .lookup({
      from: "product_requests",
      localField: "_id",
      foreignField: "delivery",
      as: "products",
      pipeline: [{
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        }
      }, {
        $addFields: {
          product: {$first: "$product"}
        }
      }]
    })
    .addFields({
      first_product_date: { $min: "$products.date" },
      last_product_date: { $max: "$products.date" },
    })
    .limit(1);
  res.json(items[0]);
});

router.post('/', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  const newId = await getLastId(Delivery) + 1;
  const item = await Delivery.create({ _id: newId, deliveryman: user._id });
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
