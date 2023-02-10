const express = require("express");
const { addCompanyCtl } = require("../controllers/companyController");


const companyRouter = express.Router();

// 
/**
 *  @path POST "/company/add"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
companyRouter.route("/add")
    .post(addCompanyCtl)
    // .get()

module.exports = {
    companyRouter
}