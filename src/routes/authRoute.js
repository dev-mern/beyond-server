const express = require("express");
const { registerUserCtl, loginUserCtl, updateProfileCommonInfo, updatePasswordCtl, verifyVerificationCodeUserCtl } = require("../controllers/authController");
const { processRegisterData, checkLogin, checkExistUserByEmail } = require("../middlewares/authMiddleware");

const authRouter = express.Router();

// register a new user
authRouter.route("/register")
    .post(checkExistUserByEmail,processRegisterData,registerUserCtl)
    .patch(verifyVerificationCodeUserCtl)
    // .get()

// login an existing user
authRouter.route("/login")
    .post(loginUserCtl)
    // .get()
    

// update user password information
authRouter.route("/users/user/:user_id/password")
    .patch(checkLogin,processRegisterData,updatePasswordCtl)

authRouter.route("/users/user/:user_id")
    .patch(checkLogin,updateProfileCommonInfo)
    // .get()


module.exports = {
    authRouter
}


