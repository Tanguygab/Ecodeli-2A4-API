import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all proofs' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET proof by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE proof' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE proof ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE proof ID: ${req.params.id}` }); });

export default router;
