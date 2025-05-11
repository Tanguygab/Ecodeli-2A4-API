import { Router } from 'express';
const router = Router();
import User from '../models/user.js'
import { searchQuery } from '../utils.js';

router.get('/', (req, res) => {
    res.json([{id: 0, name: "Peluche Creeper", price: 5, size: {id: 0, name: "small", size: 5}, seller: {name: "Hi"}}]);
});
router.get('/sellers', async (req, res) => {
    res.json(await User.find({$or: [searchQuery(req, "input"), searchQuery(req, "input", "firstname")]}, {_id: 1, firstname: 1, name: 1}))
})
router.get('/:id', (req, res) => { res.json({ message: `GET product by ID: ${req.params.id}` }); });
router.post('/', (req, res) => { res.json({ message: 'CREATE product' }); });
router.put('/:id', (req, res) => { res.json({ message: `UPDATE product ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE product ID: ${req.params.id}` }); });

export default router;
