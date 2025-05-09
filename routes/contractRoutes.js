const express = require('express');
const router = express.Router();
const contractCtrl = require('../controllers/contractController');

router.get('/', contractCtrl.getAll);
router.get('/:id', contractCtrl.getById);
router.post('/', contractCtrl.create);
router.put('/:id', contractCtrl.update);
router.delete('/:id', contractCtrl.remove);

module.exports = router;
