const {Address} = require("../models/models");
const ApiError = require('../error/Error');

class addressController {
    async get(req, res, next) {
        const query = req.query;



        // if () {
        //     return next(ApiError.badRequest('no body!!!'));
        // }
    }

    async create(req, res, next) {
        console.log(req.body)

        try {
            if (!(req.body.customer_id && req.body.country && req.body.city && req.body.house && req.body.apartment && req.body.zip)) {
                return next(ApiError.badRequest('Invalid input body'));
            } else {
                const address = await Address.create({
                    country: req.body.country,
                    city: req.body.city,
                    house: req.body.house,
                    apartment: req.body.apartment,
                    zip: req.body.zip,
                    customer_id: req.body.customer_id
                });

                res.status(201).json(address);
            }
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while creating address'));
        }
    }
}

module.exports = new addressController();