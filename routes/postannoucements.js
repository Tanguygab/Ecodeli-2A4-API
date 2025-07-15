import { Router } from 'express';
import Postannoucement from '../models/postannoucement.js';
import { error, getLastId } from '../utils.js'
import multer from 'multer'
import fs from 'fs'
const router = Router();

// Créer le dossier uploads s'il n'existe pas
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

// Configuration multer pour la gestion des justificatifs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Multer destination called for file:', file.originalname);
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    console.log('Multer filename called, generating:', filename);
    cb(null, filename);
  }
})
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    console.log('File filter called for file:', file.originalname);
    cb(null, true);
  }
})

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
