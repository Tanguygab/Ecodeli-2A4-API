const express = require('express');
const router = express.Router();
const delivery_statusCtrl = require('../controllers/delivery_statusController');

router.get('/', delivery_statusCtrl.getAll);
router.get('/:id', delivery_statusCtrl.getById);
router.post('/', delivery_statusCtrl.create);
router.put('/:id', delivery_statusCtrl.update);
router.delete('/:id', delivery_statusCtrl.remove);

module.exports = router;
