const Router = require('express');
const router = new Router();
const customerController = require('../controllers/customerController');

router.get('/');
router.post('/', customerController.create);

module.exports = router;
