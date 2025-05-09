const express = require('express');
const router = express.Router();
const deliveryCtrl = require('../controllers/deliveryController');

router.get('/', deliveryCtrl.getAll);
router.get('/:id', deliveryCtrl.getById);
router.post('/', deliveryCtrl.create);
router.put('/:id', deliveryCtrl.update);
router.delete('/:id', deliveryCtrl.remove);

module.exports = router;
