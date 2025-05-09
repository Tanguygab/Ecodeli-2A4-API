const express = require('express');
const router = express.Router();
const product_sizeCtrl = require('../controllers/product_sizeController');

router.get('/', product_sizeCtrl.getAll);
router.get('/:id', product_sizeCtrl.getById);
router.post('/', product_sizeCtrl.create);
router.put('/:id', product_sizeCtrl.update);
router.delete('/:id', product_sizeCtrl.remove);

module.exports = router;
