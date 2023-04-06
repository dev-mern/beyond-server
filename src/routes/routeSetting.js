const { errorHandler, notFoundHandler } = require("../middlewares/common")
const { authRouter } = require("./authRoute");
const { companyRouter } = require("./companyRoute");
const { creditRouter } = require("./creditRouter");
const { documentsRouter } = require("./documentsRouter");
const { orderRouter } = require("./orderRouter");
const { packageRouter } = require("./packageRoute");
const { testimonialRouter } = require("./testimonial");

function routeSetting(app) {

    // Auth routes setup
    app.use("/auth",authRouter);

    // Company routes setup
    app.use("/company",companyRouter);
    
    // Credit card routes setup
    app.use("/credit",creditRouter);

    // Credit card routes setup
    app.use("/documents",documentsRouter);

    // Package routes setup
    app.use("/packages",packageRouter);

    // Package routes setup
    app.use("/order",orderRouter);

    // Testimonial routes setup
    app.use("/testimonials",testimonialRouter);



    // not found handler
    app.use(notFoundHandler);
    // error handler
    app.use(errorHandler)
}

module.exports = {
    routeSetting,
}