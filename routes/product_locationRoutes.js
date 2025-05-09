const express = require('express');
const router = express.Router();
const product_locationCtrl = require('../controllers/product_locationController');

router.get('/', product_locationCtrl.getAll);
router.get('/:id', product_locationCtrl.getById);
router.post('/', product_locationCtrl.create);
router.put('/:id', product_locationCtrl.update);
router.delete('/:id', product_locationCtrl.remove);

module.exports = router;
