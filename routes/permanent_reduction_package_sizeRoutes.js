const express = require('express');
const router = express.Router();
const permanent_reduction_package_sizeCtrl = require('../controllers/permanent_reduction_package_sizeController');

router.get('/', permanent_reduction_package_sizeCtrl.getAll);
router.get('/:id', permanent_reduction_package_sizeCtrl.getById);
router.post('/', permanent_reduction_package_sizeCtrl.create);
router.put('/:id', permanent_reduction_package_sizeCtrl.update);
router.delete('/:id', permanent_reduction_package_sizeCtrl.remove);

module.exports = router;
