const express = require("express");
const { registerUserCtl, loginUserCtl } = require("../controllers/authController");
const { processRegisterData, checkLogin, checkExistUserByEmail } = require("../middlewares/authMiddleware");

const authRouter = express.Router();

// register a new user
/**
 *  @path POST "/auth/register"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
authRouter.route("/register")
    .post(checkExistUserByEmail,processRegisterData,registerUserCtl)
    // .get()

// login an existing user
/**
 *  @path POST "/auth/login"
 *  @body {}
 *  @return {}
 *  @Error {}
 */
authRouter.route("/login")
    .post(loginUserCtl)
    // .get()

module.exports = {
    authRouter
}


