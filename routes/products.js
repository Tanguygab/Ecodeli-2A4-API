import { Router } from 'express';
import Product from '../models/product.js';
import { error, find, getLastId, searchQuery, validToken } from '../utils.js'
import User, { populateUser } from '../models/user.js'
import ProductRequest from '../models/product_request.js'
import Location from '../models/location.js'
import Delivery from '../models/delivery.js'
import multer from 'multer'
const router = Router();

// Configuration multer pour la gestion des images de produits
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.get('/', async (req, res) => {
  try {
    const items = await populateUser(Product.find(), "seller")
      .populate('size')
      .populate('location');
    res.json(items);
  } catch (err) {
    console.error('Error getting products:', err);
    error(res, "database-error", 500);
  }
});

router.get('/sellers', async (req, res) => {
  try {
    const sellers = await User.find({
      $or: [
        searchQuery(req, "input"), 
        searchQuery(req, "input", "firstname")
      ]
    }, {_id: 1, firstname: 1, name: 1});
    res.json(sellers);
  } catch (err) {
    console.error('Error getting sellers:', err);
    error(res, "database-error", 500);
  }
});

router.get('/requests', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const requests = await ProductRequest.find({receiver: user._id}).populate("product");
    res.json(requests);
  } catch (err) {
    console.error('Error getting product requests:', err);
    error(res, "database-error", 500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await populateUser(Product.findOne({ _id: req.params.id }), "seller")
      .populate('size')
      .populate('location');
    if (!item) {
      error(res, 'product.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error getting product:', err);
    error(res, "database-error", 500);
  }
});

router.get('/requests/:id', async (req, res) => {
  try {
    const item = await populateUser(ProductRequest.findOne({ _id: req.params.id }), "receiver")
      .populate('delivery_location')
      .populate('delivery')
      .populate({
        path: 'product',
        populate: [
          {
            path: 'size'
          },
          {
            path: 'seller',
            select: "_id firstname name email description join_date role"
          }
        ]
      });
    if (!item) {
      error(res, 'product-request.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error getting product request:', err);
    error(res, "database-error", 500);
  }
});

router.post('/requests/:id/accept', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null || user.role.name !== 'deliveryman') return;
  const request = await ProductRequest.findOne({ _id: req.params.id });
  if (request === null) {
    error(res, 'product-request.not-found', 404);
    return;
  }
  if (request.delivery !== null) {
    error(res, 'product-request.already-assigned', 404);
    return;
  }
  const delivery = await Delivery.findOne({ _id: req.body.delivery, deliveryman: user._id });
  if (delivery === null) {
    error(res, 'delivery.not-found', 404);
    return;
  }

  await ProductRequest.updateOne({ _id: req.params.id }, { delivery: delivery._id })
  res.json("request.accepted");
});

router.post('/', upload.single('image'), async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const newId = await getLastId(Product) + 1;
    const productData = {
      _id: newId,
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      seller: user._id,
      location: req.body.location
    };
    
    // Ajouter l'image si elle est fournie
    if (req.file) {
      productData.image = '/uploads/' + req.file.filename;
    }
    
    const item = await Product.create(productData);
    res.json(item);
  } catch (err) {
    console.error('Error creating product:', err);
    error(res, "creation-failed", 500);
  }
});

router.post('/:id/buy', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const product = await find(res, Product, req.params.id, "product.not-found");
    if (product === null) return;

    const location = await find(res, Location, req.body.location, "location.not-found");
    if (location === null) return;

    const newId = await getLastId(ProductRequest) + 1;
    const item = await ProductRequest.create({
      _id: newId,
      creation_date: new Date(),
      delivery_location: location._id,
      receiver: user._id,
      product: product._id,
      amount: req.body.amount,
      delivery_status: 1
    });
    res.json(item);
  } catch (err) {
    console.error('Error creating product request:', err);
    error(res, "creation-failed", 500);
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const updateData = { ...req.body };
    
    // Ajouter l'image si elle est fournie
    if (req.file) {
      updateData.image = '/uploads/' + req.file.filename;
    }
    
    const item = await Product.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );
    if (!item) {
      error(res, 'product.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error updating product:', err);
    error(res, "update-failed", 500);
  }
});

router.delete('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await Product.findOneAndDelete({ _id: req.params.id });
    if (!item) {
      error(res, 'product.not-found', 404);
      return;
    }
    res.json();
  } catch (err) {
    console.error('Error deleting product:', err);
    error(res, "deletion-failed", 500);
  }
});

export default router;
