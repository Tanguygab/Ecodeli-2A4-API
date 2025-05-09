const express = require('express');
const router = express.Router();
const product_requestedCtrl = require('../controllers/product_requestedController');

router.get('/', product_requestedCtrl.getAll);
router.get('/:id', product_requestedCtrl.getById);
router.post('/', product_requestedCtrl.create);
router.put('/:id', product_requestedCtrl.update);
router.delete('/:id', product_requestedCtrl.remove);

module.exports = router;
