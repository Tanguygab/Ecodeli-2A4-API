const express = require('express');
const router = express.Router();
const service_actorCtrl = require('../controllers/service_actorController');

router.get('/', service_actorCtrl.getAll);
router.get('/:id', service_actorCtrl.getById);
router.post('/', service_actorCtrl.create);
router.put('/:id', service_actorCtrl.update);
router.delete('/:id', service_actorCtrl.remove);

module.exports = router;
