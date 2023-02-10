const { addFilesService, getFilesInfoByUserService } = require("../services/documetService");

// add a list of document controller
async function addDocumentsCtl(req,res,next) {
    const {year,company_id:company} = req.body;
    
    try {
        const {_id:user_id}= req.decodedUser??{};
        const fileList = [];
        // book keeping category
        if (req.files['bookkeeping_files']) {
            req.files['bookkeeping_files'].forEach(file =>{
                fileList.push({user:user_id, name: file.filename, category:file.fieldname, year,company});
            })
        }
        // tax files category
        if (req.files['tax_files']) {
            req.files['tax_files'].forEach(file =>{
                fileList.push({user:user_id, name: file.filename,category:file.fieldname, year, company});
            })
        }
        const uploadResult = await addFilesService(fileList);
        
        return res.status(200).json(uploadResult);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}

// get list of all documents of a single users
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


// get list of all documents of a single company
async function getDocsInfoByUserIDandCompanyIDCtl(req,res,next) {
    const {user_id,company_id} = req.params;
    console.table(req.params)
    try {
        /*
        const {_id:decodedUser_id}= req.decodedUser??{};

        if (!user_id) {
            return res.status(401).json({success:false,data:{},error:"user id is required to get files"});
        }
        
        if (user_id.trim() !== decodedUser_id.valueOf()) {
            console.log(user_id,decodedUser_id);
            return res.status(401).json({success:false,data:{},error:"Unauthorized user"});
        }

        const files = await getFilesInfoByUserService(user_id);
        
        return res.status(200).json(files);
        */
        return res.status(200).json({code:"Write code for this function in controller"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,data:{},error:error.message});
    }
}



module.exports = {
    addDocumentsCtl,
    getDocumentsInfoByUser,
    getDocsInfoByUserIDandCompanyIDCtl,
}