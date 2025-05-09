const express = require('express');
const router = express.Router();
const service_userCtrl = require('../controllers/service_userController');

router.get('/', service_userCtrl.getAll);
router.get('/:id', service_userCtrl.getById);
router.post('/', service_userCtrl.create);
router.put('/:id', service_userCtrl.update);
router.delete('/:id', service_userCtrl.remove);

module.exports = router;
