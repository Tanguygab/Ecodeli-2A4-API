import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all notifications' }); });
router.get('/:id', (req, res) => { res.json({ message: `GET notification by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE notification' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE notification ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE notification ID: ${req.params.id}` }); });

export default router;
