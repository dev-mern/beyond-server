const { addOrderService } = require("../services/orderService");
const { checkUserExist } = require("../services/userService");

async function addOrderCtl(req,res,next) {
    // check user identity
    const isExistUser = await checkUserExist({_id:req.body?.user_id});
    console.log(isExistUser);
    if (!isExistUser?._id) {
        return res.status(401).json({success:false,error:{user:"Not a user!"}});
    }
    // check payment information

    // add the 
    const newOrder = {
        ...req.body,
        package:req.body?.package_id,
        user:req.body?.user_id,
        company:req.body?.company_id,
    };
    const order = await addOrderService(newOrder);
    
    if (order.error) {
        return res.status(422).json(order);
    }
    
    return res.status(200).json({success:true,data:order});
}

module.exports = {
    addOrderCtl,
}


