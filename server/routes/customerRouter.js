const Router = require('express');
const router = new Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', customerController.getAll);
router.get('/auth', authMiddleware, customerController.check)
router.get('/login', customerController.login);
router.get('/:id', customerController.getById);
router.post('/', customerController.create);

module.exports = router;
