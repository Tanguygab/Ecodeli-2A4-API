import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all bills' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET bill by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE bill' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE bill ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE bill ID: ${req.params.id}` }); });

export default router;
