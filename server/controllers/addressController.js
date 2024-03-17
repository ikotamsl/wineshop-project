const {Address} = require("../models/models");
const ApiError = require('../error/Error');

class addressController {
    async get(req, res, next) {
        const query = req.query;
        console.log(query);
        console.log(Object.keys(query).length);

        try {
            if (Object.keys(query).length === 0) {
                const addresses = await Address.findAll();
                res.status(200).json(
                    {
                        data: [...addresses]
                    }
                );
            }
            else {
                let filter = {}

                if (query.id)
                    filter.id = query.id;
                if (query.country)
                    filter.country = query.country
                if (query.city)
                    filter.city = query.city
                if (query.house)
                    filter.house = query.house
                if (query.apartment)
                    filter.apartment = query.apartment
                if (query.zip)
                    filter.zip = query.zip
                if (query.customer_id)
                    filter.customer_id = query.customer_id

                const addresses = await Address.findAll({
                    where: filter
                });
                res.status(200).json(
                    {
                        data: [...addresses]
                    }
                );
            }
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting addresses'));
        }
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
                    street: req.body.street,
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