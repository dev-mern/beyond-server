const { adduserService, getUserByEmailService, updateUserProfileByIdService, getUserByUserIdService, deleteUserByUserIdService, updateAdminRoleByUserIdService, getAllUsersService, countAllUsersService } = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../utils/env_init");
const { sendEmail } = require("../utils/emailhandler");
const { getRandomNumber } = require("../utils/generator");

// add a new user
async function registerUserCtl(req,res,next) {
    // generate unique verification code
    const verificationCode = getRandomNumber(100000,999999);
    const user = await adduserService({...req.body,verificationCode});
    if (user.error) {
        return res.status(422).json(user);
    }

    // send email with verification code
    const emailTemplate = `
        <div>
            <p>Hey, Design a HTML template for email page<p>
            <p>Verification code: ${verificationCode}</p>
        </div>
    `;
    const emailSubject = 'This is Registration verification Email';
    const fromCompanyEmail = "admin@beyond.com";
    const emRes = await sendEmail(user.email,emailTemplate,emailSubject,fromCompanyEmail);
    if (!emRes) {
        // delete the user from database as failed to send verification code
        const deleteuser = await deleteUserByUserIdService(user._id);
        return res.status(422).json({success:false,data:{},error:{common:"Failed to send verification code"}})
    }

    // generate and send token also
    const userObject = {
        _id: user._id,
        lname: user.lname,
        fname: user.fname,
        email: user.email,
        mobile: user.mobile,
        referral_id: user.referral_id,
        referenced_by: user.referenced_by,
        verified: user.verified,
        joined: user.createdAt,
        active: user.active,
    }
    const token = jwt.sign(userObject,env.jwt_secret,{expiresIn:env.jwt_expire});
    
    // const {_id,fname,lname,email,mobile,referral_id,referenced_by,verified,role,createdAt,updatedAt,active} = user??{};
    // return res.status(200).json({success:true,data:{_id,fname,lname,email,mobile,referral_id,referenced_by,active,verified,role,createdAt,updatedAt}});
    return res.status(200).json({success:true,data:{...userObject,token}});
}

// verify new user email
async function verifyVerificationCodeUserCtl(req,res,next) {
    const {email,password:body_password,verification_code} = req.body;
    // get user information by email
    const user = await getUserByEmailService(email);
    if (!user?._id) {
        return res.status(422).json(user);
    }
    // match the password
    // const isValidPassword = await bcrypt.compare(body_password,user.password);
    // if (!isValidPassword) {
    //     return res.status(401).json({success:false,data:{},error:{common:"Email and password mismatched"}});
    // }
    // match verification code
    if (user.verificationCode !== parseInt(verification_code)) {
        return res.status(401).json({success:false,data:{},error:{common:"Wrong verification code."}});
    }
    // update verify status
    const updateRes = await updateUserProfileByIdService(user._id,{verificationCode:0,verified:true});
    const result = JSON.parse(JSON.stringify(updateRes));
    delete result.verificationCode;
    return res.status(200).json({success:true,data:result,error:{}});
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
        console.log(user);
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
            role: user.role,
            mobile: user.mobile,
            active: user.active,
            referral_id: user.referral_id,
            referenced_by: user.referenced_by,
            verified: user.verified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
        // generate token 
        const token = jwt.sign(userObject,env.jwt_secret,{expiresIn:env.jwt_expire});
        return res.status(200).json({success:true,data:{access:{token,expiresIn:env.jwt_expire},user:userObject},error:{}});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,data:{},error:{common:"Unknow error occured in server"}});
    }
}

// login a user
async function updateProfileCommonInfo(req,res,next) {
    const {user_id} = req.params;
    const {_id} = req.decodedUser; 
    
    try {
        if (_id.toString() !== user_id) {
            return res.status(401).json({success:false,data:{},error:{common:"Invalid credential!"}});
        }
        const {fname,lname,mobile} = req.body;
        const updateInfo = {fname,lname,mobile};
        // delete the keys which are undefined
        Object.keys(updateInfo).reduce((prevObj,curKey)=>{
            if (!updateInfo[curKey]) {
                delete updateInfo[curKey];
            }
        },updateInfo);
        const updateRes = await updateUserProfileByIdService(_id,updateInfo);
        // console.log(updateRes);
        
        return res.status(200).json({success:true,data:updateRes,error:{}});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,data:{},error:{common:"Unknow error occured in server"}});
    }
}

async function updatePasswordCtl(req,res,next) {
    const {user_id} = req.params;
    const {_id} = req.decodedUser; 
    
    try {
        if (_id.toString() !== user_id) {
            return res.status(401).json({success:false,data:{},error:{common:"Invalid credential!"}});
        }
        
        // find user from DB
        const user = await getUserByUserIdService(_id);
        const {old_password,password} = req.body;
        
        // match the password
        const isValidPassword = await bcrypt.compare(old_password,user.password);
        if (!isValidPassword) {
            return res.status(401).json({success:false,data:{},error:{common:"Password mismatched"}});
        }

        // password already encrypted by middleware, now update the profile
        const updateRes = await updateUserProfileByIdService(_id,{password});
        
        return res.status(200).json({success:true,data:updateRes,error:{}});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,data:{},error:{common:"Unknow error occured in server"}});
    }
}
async function updateAdminRoleCtl(req,res,next) {
   const role_user_id = req.body.role_user_id;
   const role = req.body.role;
    try {
        if (!role || !role_user_id) {
            return res.status(422).json({success:false,data:{},error:{common:"Role and id is required"}});
        }
        const updateRes = await updateAdminRoleByUserIdService(role_user_id,role);
        // console.log(updateRes,"updateRes");
        if (updateRes?._id) {
            return res.status(200).json({success:true,data:updateRes,error:{}});
        }
        return res.status(422).json({success:false,data:updateRes ||{},error:{common:"Faild to update"}});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,data:{},error:{common:"Unknow error occured in server"}});
    }
}
async function getUserListCtl(req,res,next) {
    const {limit,page,...rest} = req.query;
    
    try {
        const users = await getAllUsersService(page,limit,rest);
        const total = await countAllUsersService(rest);
        // remove password
        return res.status(200).json({success:true,data:{total,users},error:{}});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,data:{},error:{common:"Unknow error occured in server"}});
    }
}

module.exports = {
    registerUserCtl,
    loginUserCtl,
    updateProfileCommonInfo,
    updatePasswordCtl,
    updateAdminRoleCtl,
    verifyVerificationCodeUserCtl,
    getUserListCtl,
}

