import { Router } from 'express';
import Location from '../models/location.js';
import { error, find, getLastId, validToken } from '../utils.js';
import { populateUser } from '../models/user.js';

const router = Router();

// GET /api/locations
router.get('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    // Récupérer seulement les locations de l'utilisateur connecté
    const items = await populateUser(Location.find({ user: user._id }));
    res.json(items);
  } catch (err) {
    console.error('Error getting locations:', err);
    error(res, "database-error", 500);
  }
});

// GET /api/locations/:id
router.get('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await populateUser(Location.findOne({ _id: req.params.id, user: user._id }));
    if (!item) {
      error(res, 'location.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error getting location:', err);
    error(res, "database-error", 500);
  }
});

// POST /api/locations
router.post('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    // Valider les champs requis
    if (!req.body.city || !req.body.zipcode || !req.body.address) {
      error(res, "missing-required-fields", 400);
      return;
    }

    // Vérifier si cette location existe déjà pour cet utilisateur
    const existingLocation = await Location.findOne({
      user: user._id,
      city: req.body.city,
      zipcode: req.body.zipcode,
      address: req.body.address,
    });

    if (existingLocation) {
      res.json(existingLocation);
      return;
    }

    // Créer une nouvelle location
    const newId = await getLastId(Location) + 1;
    const newLocation = await Location.create({
      _id: newId,
      user: user._id,
      city: req.body.city,
      zipcode: req.body.zipcode,
      address: req.body.address,
    });

    const populatedLocation = await populateUser(Location.findOne({ _id: newLocation._id }));
    res.json(populatedLocation);
  } catch (err) {
    console.error('Error creating location:', err);
    error(res, "creation-failed", 500);
  }
});

// PUT /api/locations/:id
router.put('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await Location.findOneAndUpdate(
      { _id: req.params.id, user: user._id },
      req.body,
      { new: true }
    );
    if (!item) {
      error(res, 'location.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error updating location:', err);
    error(res, "update-failed", 500);
  }
});

// DELETE /api/locations/:id
router.delete('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  try {
    const item = await Location.findOneAndDelete({ 
      _id: req.params.id, 
      user: user._id 
    });
    if (!item) {
      error(res, 'location.not-found', 404);
      return;
    }
    res.json();
  } catch (err) {
    console.error('Error deleting location:', err);
    error(res, "deletion-failed", 500);
  }
});

export default router;