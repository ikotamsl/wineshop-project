const Router = require('express');
const router = new Router();
const addressController = require('../controllers/addressController');

router.get('/', addressController.get);
router.post('/', addressController.create);

module.exports = router;
