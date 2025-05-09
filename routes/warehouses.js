import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all warehouses' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET warehouse by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE warehouse' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE warehouse ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE warehouse ID: ${req.params.id}` }); });

export default router;
