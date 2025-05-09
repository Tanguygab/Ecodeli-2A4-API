import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all contracts' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET contract by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE contract' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE contract ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE contract ID: ${req.params.id}` }); });

export default router;
