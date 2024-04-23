const {Order,
    Cart,
    Cart_position,
    Position} = require("../models/models");
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

        console.log(body);
        try {
             if (body?.is_special) {
                 const order = await Order.create(req.body);
                 res.status(201).json({message: `Order ${order.id} created`});
             }

             if (body?.is_special !== undefined && !body?.is_special) {
                 if (body.customer_id && body.address_id && body.cart_id) {

                     // TODO
                     // Subtract the amount from a cart and only then create an order
                     // also remove records for the following cart_id from cart_positions

                     const cart_positions = await Cart_position.findAll(
                         {
                             where: {
                                 cart_id: body.cart_id
                             }
                         }
                     );

                     for (const e of JSON.parse(JSON.stringify(cart_positions))) {

                         const position = JSON.parse(JSON.stringify(await Position.findByPk(e.position_id)));

                         console.log('position ', position);

                         const p = await Position.update(
                             {
                                 stock: position.stock - e.quantity,
                             },
                             {
                                 where: {
                                     id: position.id
                                 }
                             }
                         );

                         const cp = await Cart_position.destroy(
                             {
                                 where: {
                                     id: e.id
                                 }
                             }
                         );
                     }

                     const order = await Order.create({
                         customer_id: body.customer_id,
                         address_id: body.address_id,
                         cart_id: body.cart_id,
                         is_special: false,
                     });

                     res.status(201).json({message: `Order ${order.id} created`});
                 } else {
                     return next(ApiError.badRequest('Invalid input body'));
                 }
             }

            if (!body.quantity || !body.is_special)
                return next(ApiError.badRequest('Invalid input'));

            const order = await Order.create(req.body);

        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while creating an order'));
        }
    }
}

module.exports = new orderController();