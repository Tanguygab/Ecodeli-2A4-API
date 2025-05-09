const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.getById);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.remove);

module.exports = router;
