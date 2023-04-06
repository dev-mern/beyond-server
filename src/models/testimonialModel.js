
const { default: mongoose } = require("mongoose");

const testimonialSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required:[true,"Title is required"],
            trim: true,
            minLength: [10,"Minimum 10 characters are required"]
        },
        text: [{
            type: String,
            trim: true,
        }],
        fname:{
            type: String,
            trim: true,
        },
        lname:{
            type: String,
            trim: true,
        },
    },
    {timestamps:{createdAt:true,updatedAt:true}}
)

const TestimonialModel = mongoose.model("Testimonial",testimonialSchema);

module.exports = {TestimonialModel}

// delete referenced docs id from other schema after deleting a doc
// ref: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb


