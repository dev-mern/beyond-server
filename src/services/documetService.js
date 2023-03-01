const fs = require('fs');
const path = require('path');
const { FileModel } = require("../models/filesModel");
const { errorFormatter } = require("../utils/formatter");



// add a list of files
async function addFilesService(files) {
    try {
        const insertResult = await FileModel.insertMany(files);
        return {success:true,error:false,message: "",data:insertResult};
    } catch (error) {
        console.log(error);
        // delete the uploaded file if any error occur
        files.forEach(file=>{
            const filePath = path.resolve(__dirname,`../files/${file.name}`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        })
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}

// get the list of file info by a single user by id 
async function getFilesInfoByUserService(user_id) {
    try {
        const files = await FileModel.find({user:user_id});
        return {success:true,error:false,message: "",data:files};
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}

// get the list of file info by a access company Id 
async function getFilesByCompanyIdAndAccessIdService(access_user_id,company_id) {
    try {
        const files = await FileModel.find({company:company_id,access:{$elemMatch:{$eq:access_user_id}}}).populate({path:"user",select:{'fname':1,'lname':1}});
        return {success:true,error:false,message: "",data:files};
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr,data:[]}
    }
}


// get a single doc by user id and the doc id
async function getFileByAccessIdAndDocIdService(access_user_id,doc_id) {
    try {
        const file = await FileModel.findOne({_id:doc_id,access:{$in:[access_user_id]}});
        return {success:true,error:false,message: "",data:file};
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}


// get a single doc by doc id
async function getDocByDocID(doc_id) {
    try {
        const file = await FileModel.findOne({_id:doc_id});
        
        return {success:true,error:false,message: "",data:file};
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}



// update a single doc by user id and the doc id
async function updateSingleFileByUserIdAndDocIdService(user_id,doc_id,updateObj) {
    try {
        const file = await FileModel.findOneAndUpdate(
            {_id:doc_id,user:user_id},
            {...updateObj},
            {new:true,runValidators:true}
        ).select({access:0});
        
        return {success:true,error:false,message: "",data:file};
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}

// delete a single doc by  doc id
async function deleteDocByDocIdService(doc_id) {
    try {
        const file = await FileModel.findOneAndDelete({_id:doc_id});
        return {success:true,error:false,message: "",data:file};
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}




module.exports = {
    addFilesService,
    getFilesInfoByUserService,
    getFilesByCompanyIdAndAccessIdService,
    getFileByAccessIdAndDocIdService,
    updateSingleFileByUserIdAndDocIdService,
    getDocByDocID,
    deleteDocByDocIdService,
}