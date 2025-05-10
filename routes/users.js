import { Router } from 'express';
import User from '../models/user.js'
import { error } from '../utils.js'
const router = Router();

router.get('/', (req, res) => { res.json({ message: 'GET all users' }); });
router.get('/:id', async (req, res) => { 
    const user = await User.findOne({ _id: req.params.id }).populate("role").populate("subscription")
    if (!user) {
        error(res, "user.not-found", 404)
        return
    }
    res.json(user)
});
router.put('/:id', (req, res) => { res.json({ message: `UPDATE user ID: ${req.params.id}` }); });
router.delete('/:id', (req, res) => { res.json({ message: `DELETE user ID: ${req.params.id}` }); });

export default router;
