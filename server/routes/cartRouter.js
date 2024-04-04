const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.get('/:id', cartController.getById);
router.patch('/:id', cartController.updateCart);

module.exports = router;
