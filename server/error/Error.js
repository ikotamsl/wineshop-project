class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static internalError(message) {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;