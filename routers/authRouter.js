// core module
const express = require("express");
const authRouter = express.Router();

// local module
const authCon = require("../controllers/authCon.js");

// get req
authRouter.get("/logInForm", authCon.getLogInForm);

// post req
authRouter.post("/login", authCon.postLogIn);
authRouter.post("/logOut", authCon.postlogOut);

module.exports = authRouter;
