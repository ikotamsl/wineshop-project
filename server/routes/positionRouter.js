const Router = require('express');
const router = new Router();
const positionController =require('../controllers/positionController');

router.get('/', positionController.getAll);
router.get('/:id', positionController.getOne);

module.exports = router;
