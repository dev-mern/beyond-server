const { UserModel } = require("../models/userModel");
const { errorFormatter } = require("../utils/formatter");
const { default: mongoose } = require("mongoose");

// add a new user
async function adduserService(user) {
    try {
        const User = new UserModel(user);
        const newUser = await User.save();
        return newUser;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}


// check if user exist 
async function checkUserExist(filter={}) {
    try {
        const isUserExist = await UserModel.exists({...filter});
        return isUserExist;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

// get a single user by any property
async function getUserByEmailService(email) {
    try {
        const user = await UserModel.findOne({email});
        return user;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

module.exports = {
    adduserService,
    checkUserExist,
    getUserByEmailService,
}