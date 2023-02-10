const express = require("express");
const { addOrderCtl } = require("../controllers/orderController");



const orderRouter = express.Router();

// 
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
orderRouter.route("/add")
    .post(addOrderCtl)
    // .get()

module.exports = {
    orderRouter
}