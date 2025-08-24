// core module
const express = require("express");
const authRouter = express.Router();

// local module
const authCon = require("../controllers/authCon");

// get req
authRouter.get("/logInForm", authCon.getLogInForm);
authRouter.get("/signUpForm", authCon.getSignUpFrom);

// post req
authRouter.post("/login", authCon.postLogIn);
authRouter.post("/logOut", authCon.postlogOut);
authRouter.post("/signUp", authCon.postSignUp);

module.exports = authRouter;
