const express = require("express");
const { addCreditCardCtl } = require("../controllers/creditCardController");


const creditRouter = express.Router();

// 
/**
 *  @path POST "/company/add"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
creditRouter.route("/card/add")
    .post(addCreditCardCtl)
    // .get()

module.exports = {
    creditRouter
}