const {Cart, Cart_position, Position, Customer} = require('../models/models')
const ApiError = require('../error/Error');

class cartController {
    async getById(req, res, next) {
        const cart_id = req.params.id;

        console.log(cart_id);

        try {
            const cart = await Cart.findByPk(cart_id, {
                include: [{ model: Cart_position}, {model: Customer}]
            });

            console.log(cart);

            if (!cart)
                return next(ApiError.notFound('Cart not found'));
            else
                res.status(200).json(cart);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Bad request'));
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

    async create(req, res, next) {
        console.log(req.body)

        try {
            if (!(req.body.login && req.body.password)) {
                return next(ApiError.badRequest('Invalid input body'));
            } else {
                const customer = await Customer.create({
                    first_name: req.body?.first_name ? req.body?.first_name : null,
                    second_name: req.body?.second_name ? req.body?.second_name : null,
                    patronymic_name: req.body?.patronymic_name ? req.body?.patronymic_name : null,
                    login: req.body.login,
                    password: await bcrypt.hash(String(req.body.password), 3),
                    birth_date: req.body?.birth_date ? req.body?.birth_date : null
                });

                res.status(201).json(customer);
            }
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while creating customer'));
        }
    }
}

module.exports = new cartController();