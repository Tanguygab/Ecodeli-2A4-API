import { Router } from 'express';
import Postannoucement from '../models/postannoucement.js';
import { error, getLastId, validToken } from '../utils.js'
import multer from 'multer'
const router = Router();

// Configuration multer pour la gestion des justificatifs
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// GET / - Récupérer toutes les demandes (admin seulement)
router.get('/', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== 'admin') {
    error(res, 'no-permission', 403);
    return;
  }

  try {
    const items = await Postannoucement.find({})
      .populate('reviewed_by', 'firstname name email')
      .sort({ submission_date: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error getting postannoucements:', err);
    error(res, "database-error", 500);
  }
});

// GET /:id - Récupérer une demande spécifique (admin seulement)
router.get('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== 'admin') {
    error(res, 'no-permission', 403);
    return;
  }

  try {
    const item = await Postannoucement.findOne({ _id: req.params.id })
      .populate('reviewed_by', 'firstname name email');
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

// POST / - Créer une nouvelle demande (public)
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

    // Vérifier si l'email n'est pas déjà utilisé pour une demande en attente
    const existingRequest = await Postannoucement.findOne({
      email: req.body.email,
      status: 'pending'
    });

    if (existingRequest) {
      error(res, 'email.already-pending', 400);
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

// PUT /:id/status - Modifier le statut d'une demande (admin seulement)
router.put('/:id/status', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== 'admin') {
    error(res, 'no-permission', 403);
    return;
  }

  try {
    const { status, notes } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      error(res, 'invalid-status', 400);
      return;
    }

    const item = await Postannoucement.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: status,
          notes: notes || '',
          reviewed_by: user._id,
          reviewed_date: new Date()
        }
      },
      { new: true }
    ).populate('reviewed_by', 'firstname name email');

    if (!item) {
      error(res, 'postannoucement.not-found', 404);
      return;
    }

    res.json(item);
  } catch (err) {
    console.error('Error updating postannoucement status:', err);
    error(res, "update-failed", 500);
  }
});

// PUT /:id - Modifier une demande (admin seulement)
router.put('/:id', upload.single('justificatif'), async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== 'admin') {
    error(res, 'no-permission', 403);
    return;
  }

  try {
    const updateFields = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      notes: req.body.notes
    };

    // Ajouter le nouveau justificatif si fourni
    if (req.file) {
      updateFields.justificatif = '/uploads/' + req.file.filename;
    }

    const item = await Postannoucement.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateFields },
      { new: true }
    ).populate('reviewed_by', 'firstname name email');

    if (!item) {
      error(res, 'postannoucement.not-found', 404);
      return;
    }

    res.json(item);
  } catch (err) {
    console.error('Error updating postannoucement:', err);
    error(res, "update-failed", 500);
  }
});

// DELETE /:id - Supprimer une demande (admin seulement)
router.delete('/:id', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== 'admin') {
    error(res, 'no-permission', 403);
    return;
  }

  try {
    const item = await Postannoucement.findOneAndDelete({ _id: req.params.id });
    if (!item) {
      error(res, 'postannoucement.not-found', 404);
      return;
    }
    res.json();
  } catch (err) {
    console.error('Error deleting postannoucement:', err);
    error(res, "deletion-failed", 500);
  }
});

// GET /stats - Statistiques des demandes (admin seulement)
router.get('/stats', async (req, res) => {
  const user = await validToken(req, res);
  if (user === null) return;

  if (user.role.name !== 'admin') {
    error(res, 'no-permission', 403);
    return;
  }

  try {
    const stats = await Postannoucement.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      total: 0
    };

    stats.forEach(stat => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });

    res.json(result);
  } catch (err) {
    console.error('Error getting postannoucement stats:', err);
    error(res, "database-error", 500);
  }
});

export default router;
