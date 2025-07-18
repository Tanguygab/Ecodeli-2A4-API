import { Router } from 'express';
import Product from '../models/product.js';
import { error, find, getLastId, searchQuery, validToken } from '../utils.js'
import User, { populateUser } from '../models/user.js'
import ProductRequest from '../models/product_request.js'
import Location from '../models/location.js'
import Delivery from '../models/delivery.js'
import DeliveryStatus from '../models/delivery_status.js'
import multer from 'multer'
const router = Router();

const upload = multer({
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
  storage: multer.diskStorage({
    destination: 'public/data/images/',
    filename: (req, file, cb) => cb(null, new Date().getTime() + "." + file.mimetype.substring(6))
  })
});

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

// ROUTE CORRIGÉE - Récupérer les demandes de produits vendus par l'utilisateur
router.get('/requests', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const requests = await ProductRequest.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product", 
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $match: {
          "productDetails.seller": user._id
        }
      },
      {
        $addFields: {
          product: { $arrayElemAt: ["$productDetails", 0] }
        }
      },
      { $unset: "productDetails" },
      {
        $lookup: {
          from: "locations",
          localField: "delivery_location",
          foreignField: "_id",
          as: "delivery_location"
        }
      },
      {
        $lookup: {
          from: "delivery_statuses",
          localField: "delivery_status",
          foreignField: "_id", 
          as: "delivery_status"
        }
      },
      {
        $lookup: {
          from: "deliveries",
          localField: "delivery",
          foreignField: "_id",
          as: "delivery"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver",
          pipeline: [
            { $project: { _id: 1, firstname: 1, name: 1, email: 1, description: 1, join_date: 1, role: 1 } }
          ]
        }
      },
      {
        $addFields: {
          delivery_location: { $arrayElemAt: ["$delivery_location", 0] },
          delivery_status: { $arrayElemAt: ["$delivery_status", 0] },
          delivery: { $arrayElemAt: ["$delivery", 0] },
          receiver: { $arrayElemAt: ["$receiver", 0] }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "product.seller",
          foreignField: "_id",
          as: "product.seller",
          pipeline: [
            { $project: { _id: 1, firstname: 1, name: 1, email: 1, description: 1, join_date: 1, role: 1 } }
          ]
        }
      },
      {
        $addFields: {
          "product.seller": { $arrayElemAt: ["$product.seller", 0] }
        }
      },
      {
        $lookup: {
          from: "package_sizes",
          localField: "product.size",
          foreignField: "_id",
          as: "product.size"
        }
      },
      {
        $lookup: {
          from: "locations",
          localField: "product.location",
          foreignField: "_id",
          as: "product.location"
        }
      },
      {
        $addFields: {
          "product.size": { $arrayElemAt: ["$product.size", 0] },
          "product.location": { $arrayElemAt: ["$product.location", 0] }
        }
      },
      { $sort: { creation_date: -1 } }
    ]);

    console.log('Product requests trouvés:', requests.length);
    res.json(requests);
  } catch (err) {
    console.error('Error getting product requests:', err);
    error(res, "database-error", 500);
  }
});

router.get('/requests/unassigned', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== "admin" && user.role.name !== "deliveryman") {
    error(res, "no-permission", 403);
    return
  }

  try {
    const requests = await ProductRequest.find({delivery: null})
      .populate("product")
      .populate('delivery_location')
      .populate('delivery_status');
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
      .populate('delivery_status')
      .populate({
        path: 'product',
        populate: [
          { path: 'size' },
          { path: 'seller', select: "_id firstname name email description join_date role" },
          { path: 'location' }
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
  if (user === null) return;
  
  if (user.role.name !== 'deliveryman' && user.role.name !== 'admin') {
    error(res, "no-permission", 403);
    return;
  }
  
  
  const request = await ProductRequest.findOne({ _id: req.params.id });
  if (request === null) {
    error(res, 'product-request.not-found', 404);
    return;
  }
  if (request.delivery != null) {
    error(res, 'product-request.already-assigned');
    return;
  }
  
  try {
    const delivery = await Delivery.findOne({ _id: req.body.delivery, deliveryman: user._id });
    if (delivery === null) {
      error(res, 'delivery.not-found', 404);
      return;
    }

    await ProductRequest.updateOne({ _id: req.params.id }, { delivery: delivery._id });
    res.json("request.accepted");
  } catch (err) {
    console.error('Error accepting product request:', err);
    error(res, "update-failed", 500);
  }
});

// Route pour créer un produit (JSON uniquement, pour l'Android)
router.post('/', upload.single('image'), async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    if (!req.body.name || !req.body.price) {
      error(res, "missing-required-fields", 400);
      return;
    }
    
    // Créer ou récupérer la location
    let locationId;
    if (req.body.location) {
      locationId = parseInt(req.body.location);
      
      const location = await Location.findOne({ _id: locationId });
      if (!location) {
        error(res, "location.not-found", 400);
        return;
      }
    } else {
      error(res, "location-required", 400);
      return;
    }

    const newId = await getLastId(Product) + 1;
    const productData = {
      _id: newId,
      name: req.body.name,
      price: parseFloat(req.body.price),
      size: parseInt(req.body.size) || 2,
      seller: user._id,
      location: locationId
    };

    if (req.file) {
      productData.image = req.file.filename;
    }


    const item = await Product.create(productData);
    console.log('Produit créé avec ID:', item._id);
    
    // Retourner le produit avec toutes les relations peuplées
    const populatedItem = await populateUser(Product.findOne({ _id: item._id }), "seller")
      .populate('size')
      .populate('location');

    res.json(populatedItem);
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
    });
    
    // Retourner la demande avec toutes les relations peuplées
    const populatedItem = await populateUser(ProductRequest.findOne({ _id: item._id }), "receiver")
      .populate('delivery_location')
      .populate('delivery_status')
      .populate({
        path: 'product',
        populate: [
          { path: 'size' },
          { path: 'seller', select: "_id firstname name email description join_date role" },
          { path: 'location' }
        ]
      });
    
    res.json(populatedItem);
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
    
    if (req.file) {
      updateData.image = req.file.filename;
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

router.put('/requests/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await ProductRequest.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!item) {
      error(res, 'product-request.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error updating product request:', err);
    error(res, "update-failed", 500);
  }
});

router.put('/requests/:id/status', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  const item = await ProductRequest.findOneAndUpdate(
    { _id: req.params.id },
    { delivery_status: req.body.status },
  );

  res.json(item);
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

router.delete('/requests/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await ProductRequest.findOneAndDelete({ _id: req.params.id });
    if (!item) {
      error(res, 'product-request.not-found', 404);
      return;
    }
    res.json();
  } catch (err) {
    console.error('Error deleting product request:', err);
    error(res, "deletion-failed", 500);
  }
});

// Route pour récupérer les produits créés par l'utilisateur connecté
router.get('/my-products', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    console.log('Récupération des produits pour vendeur:', user._id);
    
    const products = await populateUser(Product.find({ seller: user._id }), "seller")
      .populate('size')
      .populate('location');
    
    console.log('Produits trouvés:', products.length);
    res.json(products);
  } catch (err) {
    console.error('Error getting user products:', err);
    error(res, "database-error", 500);
  }
});

// Route pour récupérer les ventes (commandes sur mes produits)
router.get('/my-sales', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    console.log('Récupération des ventes pour vendeur:', user._id);
    
    const sales = await ProductRequest.find()
      .populate({
        path: 'product',
        match: { seller: user._id },
        populate: [
          { path: 'size' },
          { path: 'seller', select: "_id firstname name email description join_date role" },
          { path: 'location' }
        ]
      })
      .populate('delivery_location')
      .populate('delivery_status')
      .populate('delivery')
      .populate('receiver', '_id firstname name email');
    
    const filteredSales = sales.filter(sale => sale.product !== null);
    
    console.log('Ventes trouvées:', filteredSales.length);
    res.json(filteredSales);
  } catch (err) {
    console.error('Error getting user sales:', err);
    error(res, "database-error", 500);
  }
});

export default router;