import express from 'express';
import ClientAnnonce from '../models/clientannonces.js';
import { isAuthenticated } from '../middleware/auth.js'; 

const router = express.Router();


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


router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        // Validation des données
        if (!title || !description || !date || !location) {
            return res.status(400).json({ 
                message: 'Tous les champs sont requis (title, description, date, location)' 
            });
        }

        const annonce = new ClientAnnonce({
            title,
            description,
            date: new Date(date),
            location,
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


router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const annonce = await ClientAnnonce.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description, date: new Date(date), location },
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
