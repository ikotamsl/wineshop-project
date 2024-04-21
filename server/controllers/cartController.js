const {Cart, Cart_position, Position, Customer} = require('../models/models')
const ApiError = require('../error/Error');

class cartController {
    async getById(req, res, next) {
        const cart_id = req.params.id;

        try {
            const cart = await Cart.findByPk(cart_id, {
                include: [{ model: Cart_position}, {model: Customer}]
            });

            if (!cart)
                return next(ApiError.notFound('Cart not found'));
            else
                res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Bad request'));
        }
    }

    async updateCart(req, res, next) {
        try {
            if (req.body.quantity && req.body.quantity < 1)
                return next(ApiError.badRequest('Quantity must be more than 0'));

            if (!req.body.cart_position && req.body.position && req.body.quantity) {
                const cartFilling = await Cart_position.findOne({
                    where: {
                        cart_id: req.params.id,
                        position_id: req.body.position
                    }
                });

                if (cartFilling)
                    return next(ApiError.badRequest('Position already exists in a cart'));

                const position = await Position.findByPk(req.body.position);

                const stock = JSON.parse(JSON.stringify(position)).stock;

                if (req.body.quantity <= stock) {
                    const addedPosition = await Cart_position.create(
                        {
                            quantity: req.body.quantity,
                            cart_id: req.params.id,
                            position_id: req.body.position
                        }
                    );

                    res.status(201).json({message: 'Successfully added position to a cart'});
                } else {
                    next(ApiError.badRequest('Not enough bottles in stock for this position'));
                }
            }

            if (req.body.quantity && req.body.cart_position && req.body.position) {
                const position = await Position.findByPk(req.body.position);

                const stock = JSON.parse(JSON.stringify(position)).stock;

                if (req.body.quantity <= stock) {
                    const updateCartPosition = await Cart_position.update(
                        {
                            quantity: req.body.quantity
                        },
                        {
                            where: {
                                id: req.body.cart_position
                            }
                        }
                    );

                    res.status(200).json({message: 'Successfully changed quantity'});
                } else {
                    next(ApiError.badRequest('Not enough bottles in stock for this position'));
                }
            }
        } catch (e) {
            console.log(e);
            return next(ApiError.notFound('Customer not found'));
        }
    }

    async getAll(req, res, next) {
        try {
            const customers = await Customer.findAll();

            res.status(200).json({data: [...customers]});
        } catch (e) {
            console.log(e);
            return next(ApiError.notFound('Customer not found'));
        }
    }
}

module.exports = new cartController();