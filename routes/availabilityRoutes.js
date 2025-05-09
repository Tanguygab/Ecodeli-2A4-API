const express = require('express');
const router = express.Router();
const availabilityCtrl = require('../controllers/availabilityController');

router.get('/', availabilityCtrl.getAll);
router.get('/:id', availabilityCtrl.getById);
router.post('/', availabilityCtrl.create);
router.put('/:id', availabilityCtrl.update);
router.delete('/:id', availabilityCtrl.remove);

module.exports = router;
