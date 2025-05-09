const express = require('express');
const router = express.Router();
const product_requestCtrl = require('../controllers/product_requestController');

router.get('/', product_requestCtrl.getAll);
router.get('/:id', product_requestCtrl.getById);
router.post('/', product_requestCtrl.create);
router.put('/:id', product_requestCtrl.update);
router.delete('/:id', product_requestCtrl.remove);

module.exports = router;
