const express = require('express');
const router = express.Router();
const user_roleCtrl = require('../controllers/user_roleController');

router.get('/', user_roleCtrl.getAll);
router.get('/:id', user_roleCtrl.getById);
router.post('/', user_roleCtrl.create);
router.put('/:id', user_roleCtrl.update);
router.delete('/:id', user_roleCtrl.remove);

module.exports = router;
