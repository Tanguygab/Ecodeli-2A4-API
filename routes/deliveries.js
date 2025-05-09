import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all deliveries' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET delivery by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE delivery' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE delivery ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE delivery ID: ${req.params.id}` }); });

export default router;
