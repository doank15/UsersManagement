const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMess = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMess,
        stack: process.env.NODE_ENV !== 'development' ? errStack : {}
    })
}
module.exports = ErrorHandler;