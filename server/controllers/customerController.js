const {Customer} = require('../models/models')
const ApiError = require('../error/Error');

class customerController {
    async getById(req, res, next) {
        const query = req.path.id;

        try {

        } catch (e) {
            console.log(e);
            return next(ApiError.notFound('Customer not found'));
        }
    }

    async getAll(req, res, next) {
        const query = req.query;

        try {

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

                Customer.addHook('beforeCreate', async (instance, options) => {
                    if (!instance.login) {
                        throw new Error(`Customer's login must be provided`);
                    } else {
                        const customerRow = await Customer.findAll({where: {login: req.body.login} });

                        if (customerRow) {
                            return next(ApiError.badRequest(`Customer with this login already exists`));
                        }
                    }
                });

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