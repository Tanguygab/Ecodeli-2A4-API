const express = require('express');
const router = express.Router();
const user_locationCtrl = require('../controllers/user_locationController');

router.get('/', user_locationCtrl.getAll);
router.get('/:id', user_locationCtrl.getById);
router.post('/', user_locationCtrl.create);
router.put('/:id', user_locationCtrl.update);
router.delete('/:id', user_locationCtrl.remove);

module.exports = router;
