const express = require('express');
const router = express.Router();
const product_delivery_statusCtrl = require('../controllers/product_delivery_statusController');

router.get('/', product_delivery_statusCtrl.getAll);
router.get('/:id', product_delivery_statusCtrl.getById);
router.post('/', product_delivery_statusCtrl.create);
router.put('/:id', product_delivery_statusCtrl.update);
router.delete('/:id', product_delivery_statusCtrl.remove);

module.exports = router;
