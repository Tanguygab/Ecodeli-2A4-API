import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all meetings' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET meeting by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE meeting' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE meeting ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE meeting ID: ${req.params.id}` }); });

export default router;
