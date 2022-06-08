const errorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        err.status = 400; //BAD REQUEST
    }

    return res
        .status(err.status || 500)
        .json({
            status: "error",
            message: err.message || "Internal Server Error"
        });

};

module.exports = errorHandler;