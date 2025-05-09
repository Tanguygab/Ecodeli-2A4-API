const express = require('express');
const router = express.Router();
const product_deliveryCtrl = require('../controllers/product_deliveryController');

router.get('/', product_deliveryCtrl.getAll);
router.get('/:id', product_deliveryCtrl.getById);
router.post('/', product_deliveryCtrl.create);
router.put('/:id', product_deliveryCtrl.update);
router.delete('/:id', product_deliveryCtrl.remove);

module.exports = router;
