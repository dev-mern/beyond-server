const { UserModel } = require("../models/userModel");
var crypto = require('crypto');


function getRandomString(length=10) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

async function generateReferralID(length=8) {
    try {
        let idNumber = null;
        let isUnique = false;
        while (!isUnique) {
            const newIdStr = getRandomString(length);
            const existId = await UserModel.exists({referral_id:newIdStr});
            if (existId === null) {
                idNumber = newIdStr; 
                isUnique = true;
            }
        }
    
        return idNumber;
    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    generateReferralID,
    
}