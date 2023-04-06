const fs = require('fs');
const path = require('path');
const mime = require('mime');
const { addFilesService, getFilesInfoByUserService, getFilesByCompanyIdAndAccessIdService, getFileByuserIdAndDocIdService, getFileByAccessIdAndDocIdService, updateSingleFileByUserIdAndDocIdService, getDocByDocID, deleteDocByDocIdService, getAllDocsService } = require("../services/documetService");
const { getFileExtension } = require('../utils/uploader');

// add a list of document controller
async function addDocumentsCtl(req,res,next) {
    const {year,company_id:company} = req.body;
    
    try {
        const {_id:user_id}= req.decodedUser??{};
        const fileList = [];
        // book keeping category
        if (req.files['bookkeeping_files']) {
            req.files['bookkeeping_files'].forEach(file =>{
                console.log(file);
                fileList.push({user:user_id, access:[user_id], name: file.filename, category:file.fieldname, year, company,mimetype:file.mimetype});
            })
        }
        // tax files category
        if (req.files['tax_files']) {
            req.files['tax_files'].forEach(file =>{
                fileList.push({user:user_id, access:[user_id], name: file.filename, category:file.fieldname, year, company,mimetype:file.mimetype});
            })
        }
        
        const uploadResult = await addFilesService(fileList);
        
        return res.status(200).json(uploadResult);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}

// get list of all documents of a single users (added only by this user)
async function getDocumentsInfoByUser(req,res,next) {
    const {user_id} = req.params;
    try {
        const {_id:decodedUser_id}= req.decodedUser??{};

        if (!user_id) {
            return res.status(401).json({success:false,data:{},error:"user id is required to get files"});
        }
        
        if (user_id.trim() !== decodedUser_id.valueOf()) {
            // console.log(user_id,decodedUser_id);
            return res.status(401).json({success:false,data:{},error:"Unauthorized user"});
        }

        const files = await getFilesInfoByUserService(user_id);
        
        return res.status(200).json(files);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}


// get list of all documents by a access ID
async function getDocsInfoByAccessUserIdCtl(req,res,next) {
    const {user_id,company_id} = req.params;
    const {page,limit} = req.query;
    
    try {
        const {_id:decodedUser_id}= req.decodedUser??{};
        
        if (!user_id) {
            return res.status(401).json({success:false,data:{},error:"user id is required to get files"});
        }
        
        if (user_id.trim() !== decodedUser_id.valueOf()) {
            // console.log(user_id,decodedUser_id);
            return res.status(401).json({success:false,data:{},error:"Unauthorized user"});
        }
        

        const filesRes = await getFilesByCompanyIdAndAccessIdService(user_id,company_id,page,limit);
        // remove the access list from docs
        const files = filesRes.data.map(doc=>{
            const {access,...rest} = doc.toObject();
            return rest;
        });
        
        return res.status(200).json(files);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}


// download the file by file id 
async function downloadDocbyDocIdCtl(req,res,next) {
    const {doc_id} = req.params;
    
    try {
        const {_id:decodedUser_id}= req.decodedUser??{};

        // get the file info by user_id and doc_id
        const fileInfoRes = await getFileByAccessIdAndDocIdService(decodedUser_id,doc_id);
        if (!fileInfoRes.data?._id) {
             return res.status(404).json(fileInfoRes);
        }
            
        const {access,...rest} = fileInfoRes.data.toObject();
        // download file
        const filePath = path.resolve(__dirname,`../files/${rest.name}`);
        if (!fs.existsSync(filePath)) {
            fileInfoRes.message = "File might be deleted";
            return res.status(404).json(fileInfoRes);
        }
        return res.download(filePath,rest.name);

        /*

            const mimeType = mime.getType(filePath);
            res.setHeader('Content-disposition',`attachment; filename=${rest.name}`);
            res.setHeader('Content-type', mimeType);
            // const fileProperty = fs.statSync(filePath);
            const fileStream = fs.createReadStream(filePath);
            // fileStream.on('data',(data)=>{
                // console.log(data);
            // })
            fileStream.on('end',(data)=>{
                res.status(200).end();
            })
            fileStream.on('error',(data)=>{
                res.status(500).send("Error reading file");
            })
            fileStream.pipe(res);
        */
       /*
            // client side download function code without file name
            const handleDownload = () => {
                fetch('/documents/document/download/63eaf685d14be0d603c6d612')
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.download = 'file.pdf';
                    a.href = url;
                    a.click();
            });
            // with file name
            const downloadFile = async () => {
                const response = await fetch('http://localhost:3000/download'); // Replace with your API endpoint
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); // Replace with the actual file name
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            };
       */
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}



// Update the file by file id 
async function updateDocByDocIdCtl(req,res,next) {
    const {doc_id} = req.params;
    // console.table(req.params)
    try {
        const {_id:decodedUser_id}= req.decodedUser??{};
        // read the old file name first before editing 
        const oldFile = await getDocByDocID(doc_id);
        if (!oldFile?.data?._id) {
            return res.status(404).json({success:false,error:true,message: "File didn't found",data:oldFile});
        }
        // add mime type with the name 
        if (req.body?.name) {
            req.body.name = req.body.name + getFileExtension(oldFile?.data?.mimetype);
        }
        
        // update the file info by user_id and doc_id
        const fileUpdateRes = await updateSingleFileByUserIdAndDocIdService(decodedUser_id,doc_id,req.body);
        // console.log(fileUpdateRes);
        if (!fileUpdateRes.data?._id) {
            return res.status(404).json({...fileUpdateRes,success:false});
        }
        
        const {access,...rest} = fileUpdateRes.data?.toObject();
        if (!rest.name) {
            return res.status(404).json({...fileUpdateRes,success:false,message:"File didn't found!"});
            // update the database with old name since file didn't find
        }
        
        // Change fileName file
        const oldfilePath = path.resolve(__dirname,`../files/${oldFile?.data?.name}`);
        const newfilePath = path.resolve(__dirname,`../files/${rest.name}`);
        console.log(oldfilePath," oldfilePath");
        if (!fs.existsSync(oldfilePath)) {
            fileUpdateRes.message = "File might be deleted";
            return res.status(404).json(fileUpdateRes);
        }
        // rename the file name
        const isUpdate = await new Promise((resolve,reject)=>{
            const updatedName = fs.rename(oldfilePath,newfilePath,(err)=>{
                if (err) {
                    throw new Error("Failed to update name")
                }
                resolve(true)
            })
        });
        console.log(isUpdate,"= isUpdate");
        return res.status(200).json({...fileUpdateRes,success:isUpdate});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}

// delete the file by file id 
async function deleteDocByDocIdCtl(req,res,next) {
    const {doc_id} = req.params;
    // console.table(req.params)
    try {
        const {_id:decodedUser_id}= req.decodedUser??{};
        // check here if he is an admin or owner of the document
        const docInfo = await getDocByDocID(doc_id);
        // if (docInfo.user_id === req.decodedUser._id || req.decodedUser.role === 'admin' || req.decodedUser.role === 'super_admin') {
            // then only allow to delete the file
        // }
        
        // delete the database info
        const deleteRes = await deleteDocByDocIdService(doc_id);
        
        // delete the real file
        const filePath = path.resolve(__dirname,`../files/${deleteRes?.data?.name}`);
        if (!fs.existsSync(filePath) || !deleteRes?.data?.name) {
            return res.status(404).json({error: true, success: false, message: "file didn't found1!", data:null});
        }
        const deleteResult = fs.unlinkSync(filePath);
        return res.status(200).json({error: false, success: true, message: "", data:deleteRes});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}

// get all files with pagination
async function getAllDocsInfoCtl(req,res,next) { 
    const {page,limit,name} = req.query;
    console.log({page,limit});
    try {
        // get the list of docs info
        const docsRes = await getAllDocsService(page,limit,name);
        return res.status(200).json(docsRes);
        
    } catch (error) {
        console.log(error,"uuuuuuuuuuuuuuuu");
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}




module.exports = {
    addDocumentsCtl,
    getDocumentsInfoByUser,
    getDocsInfoByAccessUserIdCtl,
    downloadDocbyDocIdCtl,
    updateDocByDocIdCtl,
    deleteDocByDocIdCtl,
    getAllDocsInfoCtl,
}