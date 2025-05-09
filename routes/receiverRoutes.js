const express = require('express');
const router = express.Router();
const receiverCtrl = require('../controllers/receiverController');

router.get('/', receiverCtrl.getAll);
router.get('/:id', receiverCtrl.getById);
router.post('/', receiverCtrl.create);
router.put('/:id', receiverCtrl.update);
router.delete('/:id', receiverCtrl.remove);

module.exports = router;
