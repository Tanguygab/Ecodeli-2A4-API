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

router.get('/requests', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    console.log('Récupération product requests pour utilisateur:', user._id);
    const requests = await ProductRequest.find({receiver: user._id})
      .populate({
        path: 'product',
        populate: [
          { path: 'size' },
          { path: 'seller', select: "_id firstname name email description join_date role" },
          { path: 'location' }
        ]
      })
      .populate('delivery_location')
      .populate('delivery_status')
      .populate('delivery');
    
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
  if (user === null || user.role.name !== 'deliveryman' && user.role.name !== 'admin') return;
  
  const request = await ProductRequest.findOne({ _id: req.params.id });
  if (request === null) {
    error(res, 'product-request.not-found', 404);
    return;
  }
  if (request.delivery != null) {
    error(res, 'product-request.already-assigned');
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

// Route pour créer un produit (JSON uniquement, pour l'Android)
router.post('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    console.log('Création produit reçue:', req.body);
    console.log('Utilisateur:', user._id, user.email);

    // Valider les données reçues
    if (!req.body.name || !req.body.price) {
      console.error('Données manquantes:', req.body);
      error(res, "missing-required-fields", 400);
      return;
    }
    
    // Créer ou récupérer la location
    let locationId;
    if (req.body.location && typeof req.body.location === 'object') {
      // Si location est un objet avec les détails
      const locationData = req.body.location;
      console.log('Création/recherche location:', locationData);
      
      // Vérifier si une location identique existe déjà
      const existingLocation = await Location.findOne({
        user: user._id,
        city: locationData.city,
        zipcode: locationData.zipcode,
        address: locationData.address,
      });
      
      if (existingLocation) {
        locationId = existingLocation._id;
        console.log('Location existante trouvée:', locationId);
      } else {
        const newLocationId = await getLastId(Location) + 1;
        const newLocation = await Location.create({
          _id: newLocationId,
          user: user._id,
          city: locationData.city,
          zipcode: locationData.zipcode,
          address: locationData.address,
        });
        locationId = newLocation._id;
        console.log('Nouvelle location créée:', locationId);
      }
    } else if (req.body.location) {
      // Si location est un ID
      locationId = parseInt(req.body.location);
      console.log('Utilisation location ID:', locationId);
      
      // Vérifier que la location existe
      const location = await Location.findOne({ _id: locationId });
      if (!location) {
        console.error('Location non trouvée:', locationId);
        error(res, "location.not-found", 400);
        return;
      }
    } else {
      console.error('Aucune location fournie');
      error(res, "location-required", 400);
      return;
    }

    const newId = await getLastId(Product) + 1;
    const productData = {
      _id: newId,
      name: req.body.name,
      price: parseFloat(req.body.price),
      size: parseInt(req.body.size) || 2, // Default à M si pas spécifié
      seller: user._id,
      location: locationId
    };
    
    console.log('Données produit à créer:', productData);
    
    const item = await Product.create(productData);
    console.log('Produit créé avec ID:', item._id);
    
    // Retourner le produit avec toutes les relations peuplées
    const populatedItem = await populateUser(Product.findOne({ _id: item._id }), "seller")
      .populate('size')
      .populate('location');
    
    console.log('Produit retourné:', populatedItem ? 'OK' : 'NULL');
    res.json(populatedItem);
  } catch (err) {
    console.error('Error creating product:', err);
    error(res, "creation-failed", 500);
  }
});

// Route pour créer un produit avec image (Multipart, pour le web)
router.post('/with-image', upload.single('image'), async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const newId = await getLastId(Product) + 1;
    const productData = {
      _id: newId,
      name: req.body.name,
      price: parseFloat(req.body.price),
      size: parseInt(req.body.size),
      seller: user._id,
      location: parseInt(req.body.location)
    };
    
    // Ajouter l'image si elle est fournie
    if (req.file) {
      productData.image = req.file.filename;
    }
    
    const item = await Product.create(productData);
    
    // Retourner le produit avec toutes les relations peuplées
    const populatedItem = await populateUser(Product.findOne({ _id: item._id }), "seller")
      .populate('size')
      .populate('location');
    
    res.json(populatedItem);
  } catch (err) {
    console.error('Error creating product with image:', err);
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

    // Récupérer le statut de livraison "pending"
    const pendingStatus = await DeliveryStatus.findOne({ name: "pending" });
    if (!pendingStatus) {
      error(res, "delivery-status-not-found", 500);
      return;
    }

    const newId = await getLastId(ProductRequest) + 1;
    const item = await ProductRequest.create({
      _id: newId,
      creation_date: new Date(),
      delivery_location: location._id,
      receiver: user._id,
      product: product._id,
      amount: req.body.amount,
      delivery_status: pendingStatus._id
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
    
    // Ajouter l'image si elle est fournie
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
