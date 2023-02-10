const { adduserService, getUserByEmailService } = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../utils/env_init");

// add a new user
async function registerUserCtl(req,res,next) {
    
    const user = await adduserService(req.body);
    
    if (user.error) {
        return res.status(422).json(user);
    }
    const {_id,fname,lname,email,mobile,referral_id,referenced_by,verified,createdAt,updatedAt,active} = user??{};
    return res.status(200).json({success:true,data:{_id,fname,lname,email,mobile,referral_id,referenced_by,active,verified,createdAt,updatedAt}});
}

// login a user
async function loginUserCtl(req,res,next) {
    try {
        const {email:body_email, password:body_password} = req.body??{};
        if (!body_email || !body_password) {
            return res.status(401).json({success:false,data:{},error:{common:"Email and password is required"}});
        }
        // find user from DB
        const user = await getUserByEmailService(body_email);
        if (!user || !user._id) {
            return res.status(401).json({success:false,data:{},error:{common:"Email and password mismatched"}});
        }
        // match the password
        const isValidPassword = await bcrypt.compare(body_password,user.password);
        if (!isValidPassword) {
            return res.status(401).json({success:false,data:{},error:{common:"Email and password mismatched"}});
        }
        const userObject = {
            _id: user._id,
            lname: user.lname,
            fname: user.fname,
            email: user.email,
            mobile: user.mobile,
            referral_id: user.referral_id,
            referenced_by: user.referenced_by,
            verified: user.verified,
            joined: user.createdAt
        }
        // generate token 
        const token = jwt.sign(userObject,env.jwt_secret,{expiresIn:env.jwt_expire});
        return res.status(200).json({success:true,data:{access:{token,expiresIn:env.jwt_expire},user:userObject},error:{}});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,data:{},error:{common:"Unknow error occured inserver"}});
    }
}



module.exports = {
    registerUserCtl,
    loginUserCtl
}

