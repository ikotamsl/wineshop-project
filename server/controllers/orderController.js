const {Order} = require("../models/models");
const ApiError = require('../error/Error');
const {or} = require("sequelize");

class orderController {
    async getAll(req, res, next) {
        try {
            const orders = await Order.findAll();

            res.status(200).json({data: [...orders]});
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting addresses'));
        }
    }

    async getOne(req, res, next) {
        try {
            const order_id = req.params.id;

            const order = await Order.findByPk(order_id);

            if (!order)
                return next(ApiError.notFound('Order not found'));

            res.status(200).json(order);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting order'));
        }
    }

    async create(req, res, next) {
        const body = req.body;

        try {
             if (body?.is_special) {
                 const order = await Order.create(req.body);
                 res.status(201).json({message: `Order ${order.id} created`});
             }
        //
        // try {
        //     if (body?.is_special !== undefined) {
        //         if (body.is_special === null || body.is_special === false) {
        //             if (body?.customer_id && body?.address_id && body?.cart_id) {
        //                 const order = await Order.create(req.body);
        //             } else {
        //                 return next(ApiError.badRequest('customer, address or cart connection is required'));
        //             }
        //         } else {
        //             const order = await Order.create(req.body);
        //         }
        //     }
        //     if (!body.quantity || !body.is_special)
        //         return next(ApiError.badRequest('Invalid input'));
        //
        //     const order = await Order.create(req.body);
        //
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while creating an order'));
        }
    }
}

module.exports = new orderController();