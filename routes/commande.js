import { Router } from 'express';
import Commande from '../models/commande.js';
import { error, getLastId, validToken } from '../utils.js';
import { populateUser } from '../models/user.js';

const router = Router();

// Récupérer toutes les commandes d'un client
router.get('/', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const commandes = await populateUser(
            Commande.find({ client: user._id }).sort({ date_commande: -1 }),
            'client'
        );
        res.json(commandes);
    } catch (err) {
        console.error('Error getting commandes:', err);
        error(res, "database-error", 500);
    }
});

// Récupérer une commande spécifique
router.get('/:id', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const commande = await populateUser(
            Commande.findOne({ _id: req.params.id, client: user._id }),
            'client'
        );
        
        if (!commande) {
            error(res, 'commande.not-found', 404);
            return;
        }
        
        res.json(commande);
    } catch (err) {
        console.error('Error getting commande:', err);
        error(res, "database-error", 500);
    }
});

// Créer une nouvelle commande
router.post('/', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const newId = await getLastId(Commande) + 1;
        
        const commandeData = {
            _id: newId,
            client: user._id,
            commercant: req.body.commercant,
            description: req.body.description,
            montant: req.body.montant,
            status: "en_attente",
            adresse_livraison: req.body.adresse_livraison,
            date_commande: new Date(),
            notes: req.body.notes || ""
        };

        const commande = await Commande.create(commandeData);
        res.json(commande);
    } catch (err) {
        console.error('Error creating commande:', err);
        error(res, "creation-failed", 500);
    }
});

// Mettre à jour une commande
router.put('/:id', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const commande = await Commande.findOneAndUpdate(
            { _id: req.params.id, client: user._id },
            req.body,
            { new: true }
        );

        if (!commande) {
            error(res, 'commande.not-found', 404);
            return;
        }

        res.json(commande);
    } catch (err) {
        console.error('Error updating commande:', err);
        error(res, "update-failed", 500);
    }
});

// Valider une livraison
router.post('/:id/validate', async (req, res) => {
    const user = await validToken(req, res);
    if (user === null) return;

    try {
        const commande = await Commande.findOneAndUpdate(
            { 
                _id: req.params.id, 
                client: user._id,
                status: "livree"
            },
            { status: "validee" },
            { new: true }
        );

        if (!commande) {
            error(res, 'commande.not-found-or-not-delivered', 404);
            return;
        }

        res.json({ message: "Livraison validée", commande });
    } catch (err) {
        console.error('Error validating commande:', err);
        error(res, "validation-failed", 500);
    }
});

export default router;