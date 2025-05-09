const express = require('express');
const router = express.Router();
const user_contractCtrl = require('../controllers/user_contractController');

router.get('/', user_contractCtrl.getAll);
router.get('/:id', user_contractCtrl.getById);
router.post('/', user_contractCtrl.create);
router.put('/:id', user_contractCtrl.update);
router.delete('/:id', user_contractCtrl.remove);

module.exports = router;
