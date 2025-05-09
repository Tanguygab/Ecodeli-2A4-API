const express = require('express');
const router = express.Router();
const meetingCtrl = require('../controllers/meetingController');

router.get('/', meetingCtrl.getAll);
router.get('/:id', meetingCtrl.getById);
router.post('/', meetingCtrl.create);
router.put('/:id', meetingCtrl.update);
router.delete('/:id', meetingCtrl.remove);

module.exports = router;
