const {Employee} = require('../models/models')
const ApiError = require('../error/Error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJwt = require('../lib/generateJwt')

class employeeController {
    async login(req, res, next) {
        const {login, password} = req.body;

        if (!login || !password)
            return next(ApiError.badRequest('No login or password provided'));

        const employee = await Employee.findOne({where: {login: login}});

        console.log(employee);

        if (!employee) {
            return next(ApiError.badRequest('Employee not found'));
        }

        let comparePassword = bcrypt.compareSync(String(password), String(employee.dataValues.password));

        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'));
        }

        const token = generateJwt({id: employee.dataValues.id, login: employee.dataValues.login, role: 'EMPLOYEE'});

        res.status(200).json({token: token});
    }
    async getById(req, res, next) {
        const customer_id = req.params.id;

        console.log(customer_id);

        try {
            const employee = await Employee.findByPk(customer_id);

            console.log(employee);

            if (!employee)
                return next(ApiError.notFound('Customer not found'));
            else
                res.status(200).json(employee);
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
                const employee = await Employee.create({
                    first_name: req.body?.first_name ? req.body?.first_name : null,
                    second_name: req.body?.second_name ? req.body?.second_name : null,
                    patronymic_name: req.body?.patronymic_name ? req.body?.patronymic_name : null,
                    login: req.body.login,
                    password: await bcrypt.hash(String(req.body.password), 3),
                    birth_date: req.body?.birth_date ? req.body?.birth_date : null
                });

                res.status(201).json(employee);
            }
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while creating customer'));
        }
    }

    async check(req, res, next) {
        const token = generateJwt({id: req.body.id, login: req.body.login, role: 'CUSTOMER'});
        return res.status(200).json({token: token});
    }
}

module.exports = new employeeController();