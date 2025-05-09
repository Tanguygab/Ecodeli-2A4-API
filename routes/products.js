import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all products' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET product by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE product' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE product ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE product ID: ${req.params.id}` }); });

export default router;
