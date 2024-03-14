const {Customer} = require('../models/models')
const ApiError = require('../error/Error');

class customerController {
    async getById(req, res, next) {
        const customer_id = req.path.id;

        try {
            const customer = await Customer.findByPk(customer_id);

            if (customer === null)
                return next(ApiError.notFound('Customer not found'));
            else
                res.status(200).json(customer);
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
                    password: req.body.password,
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

module.exports = new customerController();