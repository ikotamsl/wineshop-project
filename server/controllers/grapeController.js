const {Grape} = require("../models/models");
const ApiError = require('../error/Error');

class grapeController {
    async getAll(req, res, next) {
        try {
            const grapes = await Grape.findAll();

            res.status(200).json({data: [...grapes]});
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting grapes'));
        }
    }

    async getOne(req, res, next) {
        try {
            const grape_id = req.params.id;

            const grape = await Grape.findByPk(grape_id);

            if (!grape)
                return next(ApiError.notFound('Grape not found'));

            res.status(200).json(grape);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting grape'));
        }
    }
}

module.exports = new grapeController();