const express = require('express');
const router = express.Router();
const package_sizeCtrl = require('../controllers/package_sizeController');

router.get('/', package_sizeCtrl.getAll);
router.get('/:id', package_sizeCtrl.getById);
router.post('/', package_sizeCtrl.create);
router.put('/:id', package_sizeCtrl.update);
router.delete('/:id', package_sizeCtrl.remove);

module.exports = router;
