const express = require('express');
const router = express.Router();
const notificationCtrl = require('../controllers/notificationController');

router.get('/', notificationCtrl.getAll);
router.get('/:id', notificationCtrl.getById);
router.post('/', notificationCtrl.create);
router.put('/:id', notificationCtrl.update);
router.delete('/:id', notificationCtrl.remove);

module.exports = router;
