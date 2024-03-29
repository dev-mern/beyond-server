const express = require("express");
const { addDocumentsCtl, getDocumentsInfoByUser, getDocsInfoByAccessUserIdCtl, downloadDocbyDocIdCtl, updateDocByDocIdCtl, deleteDocByDocIdCtl, getAllDocsInfoCtl } = require("../controllers/documentsController");
const { checkLogin, isAdmin } = require("../middlewares/authMiddleware");
const { uploader } = require("../utils/uploader");


const documentsRouter = express.Router();

documentsRouter.route("/")
// .get(checkLogin,getDocumentsCtl)
    .post(checkLogin,uploader.fields([{name:"bookkeeping_files",maxCount:50},{name:"tax_files",maxCount:50},]),addDocumentsCtl)

    // ___________admin routes start_________________ 
// get all documents information
documentsRouter.route("/admin/files")   
    // "/documents/admin/files?name=asd&limit=5&page=3"
    .get(checkLogin,isAdmin,getAllDocsInfoCtl)
    // ___________admin routes end_________________ 




// get an existing document
/**
 *  @path Get "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/document")
    // .get(checkLogin,getDocumentCtl)
    // .post()



// get an existing document
/**
 *  @path Get "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/document/download/:doc_id")
    .get(checkLogin,downloadDocbyDocIdCtl)
    // .post()

// Edit an existing document
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/document/edit/:doc_id")
    // .get()
    .patch(checkLogin,updateDocByDocIdCtl)

documentsRouter.route("/document/delete/:doc_id")
    // .get()
    .delete(checkLogin,deleteDocByDocIdCtl)

    

// get  document list by user id (added only by this user)
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/:user_id")
    .get(checkLogin,getDocumentsInfoByUser)


// get company wise document list by access_user_id
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/:user_id/:company_id")
    .get(checkLogin,getDocsInfoByAccessUserIdCtl)
    
    
    

module.exports = {
    documentsRouter
}


