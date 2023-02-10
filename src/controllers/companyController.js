const { addCompanyService, getCompanies, checkCompanyExist } = require("../services/companyService");
const { checkUserExist } = require("../services/userService");
const { isValidObjectId } = require("../utils/formatter");

async function addCompanyCtl(req,res,next) {
    try {
         // check mongoose _id are valid
         if (!isValidObjectId(req.body?.user)) {
            return res.status(422).json({success:false,data:{},error:{user_id:"Invalid user id"}});
        }
        // check if user _id is a real user
        const isExistUser = await checkUserExist({_id:req.body?.user});
        if (!isExistUser?._id) {
            return res.status(422).json({success:false,error:true,error:{user:"User doesn't exist"}});
        }
        // check if the company is already added by the user
        const existCompanies = await checkCompanyExist({user:req.body.user,name:req.body.name});
        if (existCompanies?._id) {
            return res.status(422).json({success:false,data:existCompanies,error:{common:"Company already exist for this user"}});
        }

        const company = await addCompanyService(req.body);
        if (company.error) {
            return res.status(422).json(company);
        }
        
        return res.status(200).json({success: true, error:{}, data:company});
        
    } catch (error) {
        console.log(error);
        return res.status(501).json({success:false, error:error.message});
    }
}

module.exports = {
    addCompanyCtl,
}

