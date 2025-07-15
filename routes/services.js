import { Router } from 'express';
import Service from '../models/service.js';
import { error, find, getLastId, validToken } from '../utils.js'
import { populateUser } from '../models/user.js'
import Location from '../models/location.js'
const router = Router();

router.get('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    // Ne récupérer que les services de l'utilisateur connecté
    const items = await populateUser(Service.find({ user: user._id }))
      .populate('actor');
    res.json(items);
  } catch (err) {
    console.error('Error getting services:', err);
    error(res, "database-error", 500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await populateUser(populateUser(Service.findOne({ _id: req.params.id })),'actor');
    if (!item) {
      error(res, 'service.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error getting service:', err);
    error(res, "database-error", 500);
  }
});

router.post('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    // Créer le service sans nécessiter de location
    const newId = await getLastId(Service) + 1;
    const serviceData = {
      _id: newId,
      creation_date: new Date(),
      date: new Date(req.body.date),
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      user: user._id,
    };

    const item = await Service.create(serviceData);
    
    // Retourner le service avec les relations peuplées
    const populatedItem = await populateUser(Service.findOne({ _id: item._id }))
      .populate('actor');
    
    res.json(populatedItem);
  } catch (err) {
    console.error('Error creating service:', err);
    error(res, "creation-failed", 500);
  }
});

router.put('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
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
  } catch (err) {
    console.error('Error updating service:', err);
    error(res, "update-failed", 500);
  }
});

router.delete('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await Service.findOneAndDelete({ 
      _id: req.params.id, 
      user: user._id // S'assurer que l'utilisateur ne peut supprimer que ses services
    });
    if (!item) {
      error(res, 'service.not-found', 404);
      return;
    }
    res.json();
  } catch (err) {
    console.error('Error deleting service:', err);
    error(res, "deletion-failed", 500);
  }
});

export default router;
