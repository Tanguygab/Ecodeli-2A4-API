const express = require('express');
const router = express.Router();
const service_providerCtrl = require('../controllers/service_providerController');

router.get('/', service_providerCtrl.getAll);
router.get('/:id', service_providerCtrl.getById);
router.post('/', service_providerCtrl.create);
router.put('/:id', service_providerCtrl.update);
router.delete('/:id', service_providerCtrl.remove);

module.exports = router;
