const express = require('express');
const router = express.Router();
const user_proofCtrl = require('../controllers/user_proofController');

router.get('/', user_proofCtrl.getAll);
router.get('/:id', user_proofCtrl.getById);
router.post('/', user_proofCtrl.create);
router.put('/:id', user_proofCtrl.update);
router.delete('/:id', user_proofCtrl.remove);

module.exports = router;
