const { TestimonialModel } = require("../models/testimonialModel");
const { errorFormatter } = require("../utils/formatter");

// add a new testimonial
async function addTestimonialService(testimonial) {

    try {
        const TesetimonialBSON = new TestimonialModel(testimonial);
        const newTestimonial = await TesetimonialBSON.save();
        return newTestimonial;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        console.log(formatedErr,"formatedErr");
        return {success:false,data:{},error: formatedErr}
    }
}
// get testimonials
async function getAllTestimonialsService(testimonial) {
    try {
        const testimonials = await TestimonialModel.find({});
        return testimonials;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        console.log(formatedErr,"formatedErr");
        return {success:false,data:{},error: formatedErr}
    }
}


module.exports = {
    addTestimonialService,
    getAllTestimonialsService,
}