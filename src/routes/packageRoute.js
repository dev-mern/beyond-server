const express = require("express");
const { addPackageCtl } = require("../controllers/packageController");


const packageRouter = express.Router();

// 
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
packageRouter.route("/add")
    .post(addPackageCtl)
    // .get()

module.exports = {
    packageRouter
}