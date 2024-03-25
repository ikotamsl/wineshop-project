const Router = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const employeeController = require('../controllers/employeeController');
const router = new Router();

router.get('/', (req, res) => {
});
router.post('/login', employeeController.login);
router.post('/', employeeController.create);
router.get('/auth', authMiddleware, employeeController.check);

module.exports = router;
