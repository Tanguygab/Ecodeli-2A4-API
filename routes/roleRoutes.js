const express = require('express');
const router = express.Router();
const roleCtrl = require('../controllers/roleController');

router.get('/', roleCtrl.getAll);
router.get('/:id', roleCtrl.getById);
router.post('/', roleCtrl.create);
router.put('/:id', roleCtrl.update);
router.delete('/:id', roleCtrl.remove);

module.exports = router;
