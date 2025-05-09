const express = require('express');
const router = express.Router();
const subscriptionCtrl = require('../controllers/subscriptionController');

router.get('/', subscriptionCtrl.getAll);
router.get('/:id', subscriptionCtrl.getById);
router.post('/', subscriptionCtrl.create);
router.put('/:id', subscriptionCtrl.update);
router.delete('/:id', subscriptionCtrl.remove);

module.exports = router;
