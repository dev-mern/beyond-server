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
// get all users
async function getAllUsersService(page=0,limit=20,filters) {
    const formatedFilter = {};
    for(const key in filters){
        formatedFilter[key] = {$regex: filters[key], $options: 'i'};
    }
    try {
        const users = await UserModel.find(formatedFilter).skip(page*limit).limit(limit).select({password:0});
        return users;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}
// count all users
async function countAllUsersService(filters) {
    const formatedFilter = {};
    for(const key in filters){
        formatedFilter[key] = {$regex: filters[key], $options: 'i'};
    }
    try {
        const users = await UserModel.countDocuments(formatedFilter);
        return users;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

// get a single user by user id
async function getUserByUserIdService(userId) {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}


// add a company _id to the user
async function addCompanyIdToUserService(user_id,company_id) {
    try {
        const user = await UserModel.findOneAndUpdate(
            {_id:user_id},
            {$push:{company:company_id}},
            {new:true}
        ).select({password:0});
        return user;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

// updater user profile by user id, update general information
async function updateUserProfileByIdService(user_id,updateDoc) {
    // console.log(updateDoc,"updateDoc");
    try {
        const user = await UserModel.findOneAndUpdate(
            {_id:user_id},
            {...updateDoc},
            {new:true}
        ).select({password:0});
        return user;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

// delete user profile by user id, 
async function deleteUserByUserIdService(user_id) {
    // console.log(updateDoc,"updateDoc");
    try {
        const user = await UserModel.findByIdAndDelete(user_id);
        return user;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}
// update user role by user id, 
async function updateAdminRoleByUserIdService(user_id,role) {
    // console.log(updateDoc,"updateDoc");
    try {
        const user = await UserModel.findOneAndUpdate({_id:user_id},{role},{new:true,runValidators:true});
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
    getAllUsersService,
    countAllUsersService,
    getUserByUserIdService,
    addCompanyIdToUserService,
    updateUserProfileByIdService,
    deleteUserByUserIdService,
    updateAdminRoleByUserIdService,
}

