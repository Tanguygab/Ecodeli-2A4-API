const express = require('express');
const router = express.Router();
const bill_receiverCtrl = require('../controllers/bill_receiverController');

router.get('/', bill_receiverCtrl.getAll);
router.get('/:id', bill_receiverCtrl.getById);
router.post('/', bill_receiverCtrl.create);
router.put('/:id', bill_receiverCtrl.update);
router.delete('/:id', bill_receiverCtrl.remove);

module.exports = router;
