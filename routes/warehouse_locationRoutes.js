const express = require('express');
const router = express.Router();
const warehouse_locationCtrl = require('../controllers/warehouse_locationController');

router.get('/', warehouse_locationCtrl.getAll);
router.get('/:id', warehouse_locationCtrl.getById);
router.post('/', warehouse_locationCtrl.create);
router.put('/:id', warehouse_locationCtrl.update);
router.delete('/:id', warehouse_locationCtrl.remove);

module.exports = router;
