const express = require('express');
const router = express.Router();
const warehouseCtrl = require('../controllers/warehouseController');

router.get('/', warehouseCtrl.getAll);
router.get('/:id', warehouseCtrl.getById);
router.post('/', warehouseCtrl.create);
router.put('/:id', warehouseCtrl.update);
router.delete('/:id', warehouseCtrl.remove);

module.exports = router;
