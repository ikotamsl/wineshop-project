const Router = require('express');
const router = new Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAll);
router.get('/login', customerController.login);
router.get('/:id', customerController.getById);
router.post('/', customerController.create);

module.exports = router;
