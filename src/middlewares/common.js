const createHttpError = require("http-errors");

function notFoundHandler(req,res,next) {
    next(createHttpError(404,"Your requested content was not found!"))
}

function errorHandler(err,req,res,next) {
    console.log(err,"error in errorhandler");
    res.status(err.status || 500)
    .json({status:err.status || 500, success:false,error:{common:err.message}});
}

module.exports = {
    errorHandler,
    notFoundHandler
}