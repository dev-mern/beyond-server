const express = require("express");
const { addDocumentsCtl, getDocumentsInfoByUser, getDocsInfoByUserIDandCompanyIDCtl } = require("../controllers/documentsController");
const { checkLogin } = require("../middlewares/authMiddleware");
const { uploader } = require("../utils/uploader");


const documentsRouter = express.Router();

documentsRouter.route("/")
// .get(checkLogin,getDocumentsCtl)
    .post(checkLogin,uploader.fields([{name:"bookkeeping_files",maxCount:50},{name:"tax_files",maxCount:50},]),addDocumentsCtl)

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

    

// get  document list by user id
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/:user_id")
    .get(checkLogin,getDocumentsInfoByUser)


// get  document list by user id and company id
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
documentsRouter.route("/:user_id/:company_id")
    .get(checkLogin,getDocsInfoByUserIDandCompanyIDCtl)

    
module.exports = {
    documentsRouter
}


