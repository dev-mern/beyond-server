const express = require("express");
const { addPackageCtl, getPackagesCtl } = require("../controllers/packageController");


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

// 
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
packageRouter.route("/")
    .get(getPackagesCtl)
    // .post(addPackageCtl)

module.exports = {
    packageRouter
}