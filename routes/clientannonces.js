import express from 'express';
import ClientAnnonce from '../models/clientannonces.js';
import { isAuthenticated } from '../mmiddleware/auth.js'; 

const router = express.Router();

// GET - Récupérer toutes les annonces
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const annonces = await ClientAnnonce.find()
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'firstname name');

        console.log('Annonces trouvées:', annonces.length);
        res.json(annonces);
    } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// POST - Créer une nouvelle annonce (VALIDATION ASSOUPLIE)
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        // Validation assouplie - seuls title et description sont vraiment requis
        if (!title || !description) {
            return res.status(400).json({ 
                message: 'Le titre et la description sont requis' 
            });
        }

        // Validation supplémentaire des types
        if (typeof title !== 'string' || typeof description !== 'string') {
            return res.status(400).json({ 
                message: 'Le titre et la description doivent être des chaînes de caractères' 
            });
        }

        // Validation de la longueur
        if (title.trim().length === 0 || description.trim().length === 0) {
            return res.status(400).json({ 
                message: 'Le titre et la description ne peuvent pas être vides' 
            });
        }

        const annonce = new ClientAnnonce({
            title: title.trim(),
            description: description.trim(),
            date: date ? new Date(date) : new Date(), // Date par défaut si vide
            location: location && location.trim() ? location.trim() : 'Non spécifié', // Valeur par défaut si vide
            user: req.user._id 
        });

        await annonce.save();
        await annonce.populate('user', 'firstname name');

        console.log('Annonce créée:', annonce);
        res.status(201).json(annonce);
    } catch (error) {
        console.error('Erreur lors de la création de l\'annonce:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// GET - Récupérer une annonce par ID
router.get('/:id', async (req, res) => {
    try {
        const annonce = await ClientAnnonce.findById(req.params.id)
            .populate('user', 'firstname name');

        if (!annonce) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }

        res.json(annonce);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'annonce:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// PUT - Mettre à jour une annonce
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        // Validation assouplie pour la mise à jour
        if (!title || !description) {
            return res.status(400).json({ 
                message: 'Le titre et la description sont requis' 
            });
        }

        const updateData = {
            title: title.trim(),
            description: description.trim(),
            date: date ? new Date(date) : new Date(),
            location: location && location.trim() ? location.trim() : 'Non spécifié'
        };

        const annonce = await ClientAnnonce.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            updateData,
            { new: true }
        ).populate('user', 'firstname name');

        if (!annonce) {
            return res.status(404).json({ message: 'Annonce non trouvée ou non autorisée' });
        }

        res.json(annonce);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const annonce = await ClientAnnonce.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!annonce) {
            return res.status(404).json({ message: 'Annonce non trouvée ou non autorisée' });
        }

        res.json({ message: 'Annonce supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router;
