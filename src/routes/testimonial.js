const express = require("express");
const { addTestimonialCtl, getTestimonialsCtl } = require("../controllers/testimonialController");
const { checkLogin, isAdmin } = require("../middlewares/authMiddleware");



const testimonialRouter = express.Router();

testimonialRouter.route("/add")
    .post(checkLogin,isAdmin,addTestimonialCtl)
    // .get()

testimonialRouter.route("/")
    .get(getTestimonialsCtl)
    // .post(addPackageCtl)

module.exports = {
    testimonialRouter
}