import { Router } from 'express';
import Prestation from '../models/prestation.js';
import { error, getLastId, validToken } from '../utils.js';
import { populateUser } from '../models/user.js';

const router = Router();

// Récupérer toutes les prestations d'un client
router.get('/', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const prestations = await populateUser(
            populateUser(
                Prestation.find({ client: user._id }).sort({ date_creation: -1 }),
                'client'
            ),
            'prestataire'
        );
        res.json(prestations);
    } catch (err) {
        console.error('Error getting prestations:', err);
        error(res, "database-error", 500);
    }
});

// Récupérer une prestation spécifique
router.get('/:id', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const prestation = await populateUser(
            populateUser(
                Prestation.findOne({ _id: req.params.id, client: user._id }),
                'client'
            ),
            'prestataire'
        );
        
        if (!prestation) {
            error(res, 'prestation.not-found', 404);
            return;
        }
        
        res.json(prestation);
    } catch (err) {
        console.error('Error getting prestation:', err);
        error(res, "database-error", 500);
    }
});

// Créer une nouvelle prestation
router.post('/', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const newId = await getLastId(Prestation) + 1;
        
        const prestationData = {
            _id: newId,
            client: user._id,
            titre: req.body.titre,
            description: req.body.description,
            tarif: req.body.tarif || 0,
            status: "demandee",
            date_prestation: new Date(req.body.date_prestation) || new Date(),
            duree_estimee: req.body.duree_estimee || 60,
            adresse: req.body.adresse,
            notes: req.body.notes || "",
            date_creation: new Date()
        };

        const prestation = await Prestation.create(prestationData);
        res.json(prestation);
    } catch (err) {
        console.error('Error creating prestation:', err);
        error(res, "creation-failed", 500);
    }
});

// Mettre à jour une prestation
router.put('/:id', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const prestation = await Prestation.findOneAndUpdate(
            { _id: req.params.id, client: user._id },
            req.body,
            { new: true }
        );

        if (!prestation) {
            error(res, 'prestation.not-found', 404);
            return;
        }

        res.json(prestation);
    } catch (err) {
        console.error('Error updating prestation:', err);
        error(res, "update-failed", 500);
    }
});

// Annuler une prestation
router.post('/:id/cancel', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const prestation = await Prestation.findOneAndUpdate(
            { 
                _id: req.params.id, 
                client: user._id,
                status: { $in: ["demandee", "acceptee"] }
            },
            { status: "annulee" },
            { new: true }
        );

        if (!prestation) {
            error(res, 'prestation.not-found-or-cannot-cancel', 404);
            return;
        }

        res.json({ message: "Prestation annulée", prestation });
    } catch (err) {
        console.error('Error cancelling prestation:', err);
        error(res, "cancellation-failed", 500);
    }
});

export default router;