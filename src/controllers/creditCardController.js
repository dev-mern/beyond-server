const { addCreditCardService, checkCreditCardExist } = require("../services/creditCardService");
const { checkUserExist } = require("../services/userService");
const { isValidObjectId } = require("../utils/formatter");

async function addCreditCardCtl(req,res,next) {
    
    try {
        // check mongoose _id are valid
        if (!isValidObjectId(req.body?.user_id)) {
            return res.status(422).json({success:false,data:{},error:{user_id:"Invalid user id"}});
        }
        
        // check if user _id is a real user
        const isExistUser = await checkUserExist({_id:req.body?.user_id});
        if (!isExistUser?._id) {
            return res.status(422).json({success:false,error:true,error:{user_id:"User doesn't exist"}});
        }
        
        // check the card information is accurate
        // use stripe and validate the information
        /*
        if(isValidCardInfo){
            req.body.status = "active", // inactive
        }else{
            return res.status(422).json({success:false,data:{},error:isValidCardInfo.message??"Invalid credit card information"});
        }
        */

        // check if card already exist
        const isExistCard = await checkCreditCardExist({card_number:req.body?.card_number});
        if (isExistCard?._id) {
            return res.status(401).json({success:false,error:{card_number:"Credit card already exist. Just update the information if necessary"}});
        }
        
        const newCard = {
            ...req.body,
            user:req.body?.user_id,
            status: "inactive"  // delete it later when validate, now adding statistically
        };
        const card = await addCreditCardService(newCard);
        
        if (card.error) {
            return res.status(422).json(card);
        }
        
        return res.status(200).json({success:true,data:card});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:{common:"Error occured in server side"}});
    }
}

module.exports = {
    addCreditCardCtl,
}

