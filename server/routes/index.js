const Router = require('express');
const router = new Router();

const addressRouter = require('./addressRouter');
const attributeRouter = require('./attributeRouter');
const cartRouter = require('./cartRouter');
const contactRouter = require('./contactRouter');
const customerRouter = require('./customerRouter');
const employeeRouter = require('./employeeRouter');
const orderRouter = require('./orderRouter');
const positionRouter = require('./positionRouter');
const typeRouter = require('./typeRouter');
const grapeRouter = require('./grapeRouter');

router.use('/customers', customerRouter);
router.use('/addresses', addressRouter);
router.use('/attributes', attributeRouter);
router.use('/carts', cartRouter);
router.use('/contacts', contactRouter);
router.use('/employees', employeeRouter);
router.use('/orders', orderRouter);
router.use('/positions', positionRouter);
router.use('/types', typeRouter);
router.use('/grapes', grapeRouter);

module.exports = router;
