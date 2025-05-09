const express = require('express');
const router = express.Router();
const user_availabilityCtrl = require('../controllers/user_availabilityController');

router.get('/', user_availabilityCtrl.getAll);
router.get('/:id', user_availabilityCtrl.getById);
router.post('/', user_availabilityCtrl.create);
router.put('/:id', user_availabilityCtrl.update);
router.delete('/:id', user_availabilityCtrl.remove);

module.exports = router;
