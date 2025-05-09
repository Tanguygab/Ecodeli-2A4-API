const express = require('express');
const router = express.Router();
const deliverymanCtrl = require('../controllers/deliverymanController');

router.get('/', deliverymanCtrl.getAll);
router.get('/:id', deliverymanCtrl.getById);
router.post('/', deliverymanCtrl.create);
router.put('/:id', deliverymanCtrl.update);
router.delete('/:id', deliverymanCtrl.remove);

module.exports = router;
