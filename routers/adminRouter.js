const express = require("express");
const adminRoute = express.Router();

// Local module
const adminCon = require("../controllers/adminCon");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const upload = require("../middlewares/multerMiddleware");

// get req
adminRoute.get("/add-homeForm", isLoggedIn, adminCon.getAddHome);
adminRoute.get("/admin-home", isLoggedIn, adminCon.getAdminHome);
adminRoute.get("/edit-home/:homeId", isLoggedIn, adminCon.getEditHome);

// post req
adminRoute.post(
  "/home-added",
  isLoggedIn,
  upload.single("photo"),
  adminCon.postAddHome
);
adminRoute.post(
  "/update-home/:homeId",
  isLoggedIn,
  upload.single("photo"),
  adminCon.postUpdateHome
);
adminRoute.post("/delete-home/:homeId", isLoggedIn, adminCon.postDeleteHome);

module.exports = adminRoute;
