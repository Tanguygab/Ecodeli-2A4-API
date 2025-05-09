const express = require('express');
const router = express.Router();
const billCtrl = require('../controllers/billController');

router.get('/', billCtrl.getAll);
router.get('/:id', billCtrl.getById);
router.post('/', billCtrl.create);
router.put('/:id', billCtrl.update);
router.delete('/:id', billCtrl.remove);

module.exports = router;
