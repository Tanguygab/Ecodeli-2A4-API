import { Router } from 'express';
import Delivery from '../models/delivery.js';
import { error, getLastId, validToken } from '../utils.js'
import multer from 'multer'
import Proof from '../models/proof.js'
import Product_request from '../models/product_request.js'
import Delivery_status from '../models/delivery_status.js'
const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/data/proofs/',
    filename: (req, file, cb) => cb(null, new Date().getTime() + "." + file.mimetype.substring(file.mimetype.indexOf("/") + 1))
  })
})

router.get('/', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  const filter = { status: { $ne: "done" }}
  if (user.role.name === "admin") filter.deliveryman = user._id

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

router.get('/statuses', async (req, res) => {
  res.json(await Delivery_status.find());
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
        $lookup: {
          from: "delivery_statuses",
          localField: "delivery_status",
          foreignField: "_id",
          as: "delivery_status",
        }
      }, {
        $addFields: {
          product: {$first: "$product"},
          delivery_status: {$first: "$delivery_status"}
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

router.post('/join', upload.single('proof'), async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  if (!req.file) {
    error(res, "no-proof")
    return
  }
  const newId = await getLastId(Proof) + 1;
  await Proof.create({
    _id: newId,
    user: user._id,
    date: new Date(),
    name: "Proof for DeliveryMan",
    filepath: req.file.filename,
  })

  res.json();
});

router.post('/:id/start', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  const item = await Delivery.findOneAndUpdate({
    _id: req.params.id,
    deliveryman: user._id,
    status: undefined
  }, {
    status: 'ongoing'
  })
  if (item) {
    await Product_request.updateMany({delivery: item._id}, {delivery_status: 1})
  }
  res.json(item);
});

router.post('/:id/end', async (req, res) => {
  const user = await validToken(req, res)
  if (user === null) return

  const item = await Delivery.findOneAndUpdate({
    _id: req.params.id,
    deliveryman: user._id,
    status: 'ongoing'
  }, {
    status: 'done'
  })
  if (item) {
    await Product_request.updateMany({delivery: item._id, delivery_status: 1}, {delivery_status: 2})
  }
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
