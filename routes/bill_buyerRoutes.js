const express = require('express');
const router = express.Router();
const bill_buyerCtrl = require('../controllers/bill_buyerController');

router.get('/', bill_buyerCtrl.getAll);
router.get('/:id', bill_buyerCtrl.getById);
router.post('/', bill_buyerCtrl.create);
router.put('/:id', bill_buyerCtrl.update);
router.delete('/:id', bill_buyerCtrl.remove);

module.exports = router;
