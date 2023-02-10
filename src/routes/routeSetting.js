const { errorHandler, notFoundHandler } = require("../middlewares/common")
const { authRouter } = require("./authRoute");
const { companyRouter } = require("./companyRoute");
const { creditRouter } = require("./creditRouter");
const { documentsRouter } = require("./documentsRouter");
const { orderRouter } = require("./orderRouter");
const { packageRouter } = require("./packageRoute");

function routeSetting(app) {

    // Auth routes setup
    app.use("/auth",authRouter);

    // Company routes setup
    app.use("/company",companyRouter);

    // Package routes setup
    app.use("/package",packageRouter);

    // Package routes setup
    app.use("/order",orderRouter);

    // Credit card routes setup
    app.use("/credit",creditRouter);

    // Credit card routes setup
    app.use("/documents",documentsRouter);

    // not found handler
    app.use(notFoundHandler);
    // error handler
    app.use(errorHandler)
}

module.exports = {
    routeSetting,
}