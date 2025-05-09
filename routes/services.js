import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all services' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET service by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE service' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE service ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE service ID: ${req.params.id}` }); });

export default router;
