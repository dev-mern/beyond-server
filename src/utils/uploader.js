const multer = require('multer');
const path = require('path');

const folder = path.resolve(__dirname,"../files");

const vpsMulterStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,folder);
    },
    filename: (req,file,cb) =>{
        const fileExtension = path.extname(file.originalname);
        const fileNewName = file.originalname
                            .replace(fileExtension,"")
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
        cb(null,fileNewName+fileExtension)
    }
})

const uploader = multer({
    storage: vpsMulterStorage,
    limits:{
        fileSize: 50 * 1000000,  // 1*1000000 = 1 MB
    },
    fileFilter:(req,file,cb)=>{
        
        if (file.fieldname === 'bookkeeping_files') {
            
            if (file.mimetype === "text/csv" || file.mimetype === 'application/pdf' || file.mimetype === "application/msword") {
                cb(null,true);
            }else{
                cb(new Error("only .csv, .pdf, .doc and .docx format allowed!"))
            }
            
        }else if (file.fieldname === 'tax_files') {
            
            if (file.mimetype === 'application/pdf' || file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                cb(null,true);
            }else{
                cb(new Error("only .pdf, .doc and .docx format allowed!"))
            }
        }
    }
})

const getFileExtension = (mimetype)=>{
    
    switch (mimetype) {
        case "text/csv":
            return '.csv';
        case 'application/pdf':
            return '.pdf';
        case "application/msword":
            return '.doc';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return '.docx';
    
        default:
            return "";
    }
}

module.exports = {
    uploader,
    getFileExtension
}