const {Customer} = require('../models/models')
const ApiError = require('../error/Error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (insObj) => {
    return jwt.sign(
        {id: insObj.id, login: insObj.login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class customerController {

    async login(req, res, next) {
        const {login, password} = req.body;

        const customer = await Customer.findOne({where: {login: login}});

        if (!customer) {
            return next(ApiError.badRequest('Customer not found'));
        }

        let comparePassword = bcrypt.compareSync(String(password), String(customer.dataValues.password));

        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'));
        }

        const token = generateJwt({id: customer.dataValues.id, login: customer.dataValues.login});
        res.status(200).json({token: token});
    }
    async getById(req, res, next) {
        const customer_id = req.params.id;

        console.log(customer_id);

        try {
            const customer = await Customer.findByPk(customer_id);

            console.log(customer);

            if (!customer)
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

module.exports = new customerController();