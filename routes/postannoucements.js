import { Router } from 'express';
import Postannoucement from '../models/postannoucement.js';
import { error, getLastId } from '../utils.js'
import multer from 'multer'
const router = Router();

// Configuration multer pour la gestion des justificatifs
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// GET / - Récupérer toutes les demandes
router.get('/', async (req, res) => {
  try {
    const items = await Postannoucement.find({})
      .sort({ submission_date: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error getting postannoucements:', err);
    error(res, "database-error", 500);
  }
});

// GET /:id - Récupérer une demande spécifique
router.get('/:id', async (req, res) => {
  try {
    const item = await Postannoucement.findOne({ _id: req.params.id });
    if (!item) {
      error(res, 'postannoucement.not-found', 404);
      return;
    }
    res.json(item);
  } catch (err) {
    console.error('Error getting postannoucement:', err);
    error(res, "database-error", 500);
  }
});

// POST / - Créer une nouvelle demande
router.post('/', upload.single('justificatif'), async (req, res) => {
  try {
    // Vérifier que tous les champs requis sont présents
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.phone) {
      error(res, 'missing-required-fields', 400);
      return;
    }

    // Vérifier qu'un fichier justificatif est fourni
    if (!req.file) {
      error(res, 'justificatif-required', 400);
      return;
    }

    const newId = await getLastId(Postannoucement) + 1;
    const postannoucementData = {
      _id: newId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      justificatif: '/uploads/' + req.file.filename,
      status: 'pending',
      submission_date: new Date()
    };

    const item = await Postannoucement.create(postannoucementData);
    res.json(item);
  } catch (err) {
    console.error('Error creating postannoucement:', err);
    error(res, "creation-failed", 500);
  }
});

export default router;
