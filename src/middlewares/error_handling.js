handledAsyncError = (err, req, res, next) => {
    console.log(err.message);
    return res.status(400).json({
        message: "Bad Requrst",
        code: 400,
        errors: err.message,
    });
};

module.exports = {
    handledAsyncError,
};
