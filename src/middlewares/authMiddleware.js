const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/userModel");
const { checkUserExist } = require("../services/userService");
const { env } = require("../utils/env_init");
const { generateReferralID, generateUserID } = require("../utils/generator");
const { encryptCryptoString } = require("../utils/incriptor");

async function processRegisterData(req,res,next) {
    
    try {
        
        // process password
        const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        if (!password_regex.test(req.body.password)) {
            return res.status(422).json({success:false,error:{password:"Password must be at least 1 digit, 1 lowercase character, 1 uppercase character, 1 special character, 8 characters long"}})
        }
        
        const saltRound = 10;
        req.body.password = await bcrypt.hash(req.body.password,saltRound);
        // process referral id
        req.body.referral_id = await generateReferralID();
        // update joiner Referrer
        const reference_id = req.body.referenced_by;
        console.log(reference_id," -> reference_by : now Write code to give REWARD");

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,error:{common: "Serverside error occured."}});
    }
    
}

async function checkLogin(req,res,next) {
    try {
        const bearerToken = req.headers['authorization'];
        if (!bearerToken) {
            return res.status(401).json({success:false,error:{common: "Token is required for this operation"}});
        }
        if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
            return res.status(401).json({success:false,error:{common: "Token is not valid"}});
        }
        
        // decode token
        const token = bearerToken.split(" ")[1];
        const decodedUser = jwt.verify(token,env.jwt_secret);
        
        // find user is real user
        const isRealUser = await checkUserExist({email:decodedUser.email});
        if (!isRealUser || !isRealUser._id) {
            return res.status(401).json({success:false,error:{common: "Token is not valid"}});
        }
        // add the decoded user to req
        decodedUser._id = isRealUser._id;
        req.decodedUser = decodedUser;
        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            console.log(error.message);
            return res.status(401).json({success:false,error:{common: "Token has been expired."}});
        }
        console.log(error);
        return res.status(500).json({success:false,error:{common: "Serverside error occured."}});
    }
}
async function checkExistUserByEmail(req,res,next) {
    const email = req.body.email;
    try {
        if(!email) next();
        const isExistUser = await checkUserExist({email});
        if(isExistUser?._id){
            return res.status(422).json({success:false,data:{...isExistUser}, error:{email: "user already exist"}});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,error:{common: "Serverside error occured."}});
    }
}

module.exports = {
    processRegisterData,
    checkLogin,
    checkExistUserByEmail,
}