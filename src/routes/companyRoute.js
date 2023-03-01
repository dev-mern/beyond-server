const express = require("express");
const { addCompanyCtl } = require("../controllers/companyController");
const { checkLogin } = require("../middlewares/authMiddleware");


const companyRouter = express.Router();

// 
/**
 *  @path POST "/company/add"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
companyRouter.route("/add")
    .post(checkLogin,addCompanyCtl)
    // .get()

module.exports = {
    companyRouter
}