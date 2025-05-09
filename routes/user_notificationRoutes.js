const express = require('express');
const router = express.Router();
const user_notificationCtrl = require('../controllers/user_notificationController');

router.get('/', user_notificationCtrl.getAll);
router.get('/:id', user_notificationCtrl.getById);
router.post('/', user_notificationCtrl.create);
router.put('/:id', user_notificationCtrl.update);
router.delete('/:id', user_notificationCtrl.remove);

module.exports = router;
