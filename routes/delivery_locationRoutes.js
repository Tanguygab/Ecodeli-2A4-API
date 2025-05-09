const express = require('express');
const router = express.Router();
const delivery_locationCtrl = require('../controllers/delivery_locationController');

router.get('/', delivery_locationCtrl.getAll);
router.get('/:id', delivery_locationCtrl.getById);
router.post('/', delivery_locationCtrl.create);
router.put('/:id', delivery_locationCtrl.update);
router.delete('/:id', delivery_locationCtrl.remove);

module.exports = router;
