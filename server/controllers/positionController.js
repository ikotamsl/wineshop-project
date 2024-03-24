const {Position, Type, Grape} = require("../models/models");
const ApiError = require('../error/Error');

class positionController {
    async getAll(req, res, next) {
        try {
            let filter = {},
                type_filter = {},
                grape_filter = {};

            if (req.query.type_code)
                type_filter = {
                    model: Type,
                    where: {
                        code: req.query.type_code
                    }
                };

            if (req.query.grape_code)
                grape_filter = {
                    model: Grape,
                    where: {
                        code: req.query.grape_code
                    }
                };

            if (req.query.year)
                filter.year = req.query.year;

            const positions = await Position.findAll({
                where: filter,
                include: [type_filter, grape_filter]
            });

            res.status(200).json({data: [...positions]});
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting addresses'));
        }
    }

    async getOne(req, res, next) {
        try {
            const position_id = req.params.id;

            const position = await Position.findByPk(position_id);

            if (!position)
                return next(ApiError.notFound('Position not found'));

            res.status(200).json(position);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting position'));
        }
    }
}

module.exports = new positionController();