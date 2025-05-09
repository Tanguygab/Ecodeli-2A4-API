const express = require('express');
const router = express.Router();
const proofCtrl = require('../controllers/proofController');

router.get('/', proofCtrl.getAll);
router.get('/:id', proofCtrl.getById);
router.post('/', proofCtrl.create);
router.put('/:id', proofCtrl.update);
router.delete('/:id', proofCtrl.remove);

module.exports = router;
