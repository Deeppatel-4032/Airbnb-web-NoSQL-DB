const express = require("express");
const adminRoute = express.Router();

// Local module
const adminCon = require("../controllers/adminCon");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

// get req
adminRoute.get("/add-homeForm", isLoggedIn, adminCon.getAddHome);
adminRoute.get("/admin-home", isLoggedIn, adminCon.getAdminHome);
adminRoute.get("/edit-home/:homeId", adminCon.getEditHome);

// post req
adminRoute.post("/home-added", isLoggedIn, adminCon.postAddHome);
adminRoute.post("/edit-home", isLoggedIn, adminCon.postUpdateHome);
adminRoute.post("/delete-home/:homeId", isLoggedIn, adminCon.postDeleteHome);

module.exports = adminRoute;
