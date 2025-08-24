// core module
const express = require("express");
const storeRouter = express.Router();

// local module
const storeCon = require("../controllers/storeCon");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

// get req
storeRouter.get("/", storeCon.getIndex);
storeRouter.get("/home", isLoggedIn, storeCon.getHome);
storeRouter.get("/booking-list", isLoggedIn, storeCon.getBookings);
storeRouter.get("/favourite-list", isLoggedIn, storeCon.getFavourite);
storeRouter.get("/home-details/:homeId", isLoggedIn, storeCon.getHoemDetails);

// post req
storeRouter.post("/favourite", isLoggedIn, storeCon.postAddToFavourite);
storeRouter.post(
  "/favourite/delete/:homeId",
  isLoggedIn,
  storeCon.postRemoveFromFavourite
);

module.exports = storeRouter;
