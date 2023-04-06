const { addTestimonialService, getAllTestimonialsService } = require("../services/testimonialService");

async function addTestimonialCtl(req,res,next) {
    if (!req.body) {
        return res.status(422).json({success:false,error:{common:"Body is required"}}); 
    }
    try {
        const testimonial  = await addTestimonialService(req.body);
        if (!testimonial._id) {
            return res.status(422).json({success:false,data:{},error:testimonial.error});
        }
        
        return res.status(200).json({success:true,data:testimonial});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:{common:"Error occured in server side"}});
    }
}

async function getTestimonialsCtl(req,res,next) {
    try {
        const testimonials  = await getAllTestimonialsService(req.body);
        return res.status(200).json({success:true,data:testimonials});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:{common:"Error occured in server side"}});
    }
}


module.exports = {
    addTestimonialCtl,
    getTestimonialsCtl,
}