const express = require('express');
const router = express.Router();
const sellerCtrl = require('../controllers/sellerController');

router.get('/', sellerCtrl.getAll);
router.get('/:id', sellerCtrl.getById);
router.post('/', sellerCtrl.create);
router.put('/:id', sellerCtrl.update);
router.delete('/:id', sellerCtrl.remove);

module.exports = router;
