const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/serviceController');

router.get('/', serviceCtrl.getAll);
router.get('/:id', serviceCtrl.getById);
router.post('/', serviceCtrl.create);
router.put('/:id', serviceCtrl.update);
router.delete('/:id', serviceCtrl.remove);

module.exports = router;
