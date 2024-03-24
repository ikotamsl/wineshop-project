const {Position, Type, Grape, Attribute} = require("../models/models");
const ApiError = require('../error/Error');

class positionController {
    async getAll(req, res, next) {
        try {
            let filter = {},
                type_filter = {},
                grape_filter = {};

            if (req.query.type_code)
                type_filter = {
                    code: req.query.type_code
                };

            if (req.query.grape_code)
                grape_filter = {
                    code: req.query.grape_code
                };

            if (req.query.year)
                filter.year = req.query.year;

            const positions = await Position.findAll({
                where: filter,
                include: [
                    {
                        model: Type,
                        where: type_filter
                    },
                    {
                        model: Grape,
                        where: grape_filter
                    },
                    {
                        model: Attribute,
                    }
                ]
            });

            res.status(200).json({data: [...positions]});
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting positions\n' + e));
        }
    }

    async getOne(req, res, next) {
        try {
            const position_id = req.params.id;

            const position = await Position.findOne({
                where: {
                    id: position_id
                },
                include: [
                    {
                        model: Attribute
                    }
                ]
            });

            if (!position)
                return next(ApiError.notFound('Position not found'));
            console.log(position);
            res.status(200).json(position);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting position'));
        }
    }
}

module.exports = new positionController();