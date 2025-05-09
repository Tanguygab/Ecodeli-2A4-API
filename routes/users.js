import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all users' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET user by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE user' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE user ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE user ID: ${req.params.id}` }); });

export default router;
