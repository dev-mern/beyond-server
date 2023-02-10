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
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}



module.exports = {
    addFilesService,
    getFilesInfoByUserService,
}