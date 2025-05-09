const express = require('express');
const router = express.Router();
const user_subscriptionCtrl = require('../controllers/user_subscriptionController');

router.get('/', user_subscriptionCtrl.getAll);
router.get('/:id', user_subscriptionCtrl.getById);
router.post('/', user_subscriptionCtrl.create);
router.put('/:id', user_subscriptionCtrl.update);
router.delete('/:id', user_subscriptionCtrl.remove);

module.exports = router;
