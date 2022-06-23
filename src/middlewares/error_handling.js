const winston = require("winston");

handledAsyncError = (error, req, res, next) => {
    console.log(error.message);
    winston.error(error.message, error);

    return res.status(400).json({
        message: "Bad Requrst",
        code: 400,
        errors: error.message,
    });
};

module.exports = {
    handledAsyncError,
};
