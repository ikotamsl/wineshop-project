const {Type} = require("../models/models");
const ApiError = require('../error/Error');

class typeController {
    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();

            res.status(200).json({data: [...types]});
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting types'));
        }
    }

    async getOne(req, res, next) {
        try {
            const type_id = req.params.id;

            const type = await Type.findByPk(type_id);

            if (!type)
                return next(ApiError.notFound('Type not found'));

            res.status(200).json(type);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError('Error while getting type'));
        }
    }
}

module.exports = new typeController();