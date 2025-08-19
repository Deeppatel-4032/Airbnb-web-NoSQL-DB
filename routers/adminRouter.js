const express = require("express");
const adminRoute = express.Router();

// local module
const adminCon = require("../controllers/adminCon");

// get req
adminRoute.get("/add-homeForm", adminCon.getAddHome);
adminRoute.get("/admin-home", adminCon.getAdminHome);
adminRoute.get("/edit-home/:homeId", adminCon.getEditHome);

// post req
adminRoute.post("/home-added", adminCon.postAddHome);
adminRoute.post("/edit-home", adminCon.postUpdateHome);
adminRoute.post("/delete-home/:homeId", adminCon.postDeleteHome);

module.exports = adminRoute;
