const express = require('express');
const router = express.Router();
const back_to_warehouseCtrl = require('../controllers/back_to_warehouseController');

router.get('/', back_to_warehouseCtrl.getAll);
router.get('/:id', back_to_warehouseCtrl.getById);
router.post('/', back_to_warehouseCtrl.create);
router.put('/:id', back_to_warehouseCtrl.update);
router.delete('/:id', back_to_warehouseCtrl.remove);

module.exports = router;
