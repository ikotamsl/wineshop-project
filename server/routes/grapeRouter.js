const Router = require('express');
const router = new Router();
const grapeController = require('../controllers/grapeController');

router.get('/', grapeController.getAll);
router.get('/:id', grapeController.getOne);

module.exports = router;
