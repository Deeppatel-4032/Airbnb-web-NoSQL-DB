const homeModel = require("../models/homeModel");
const userModel = require("../models/userModel");

// ============================== get request heandale ==================================

// get home page
exports.getIndex = async (req, res) => {
  console.log(req.session, req.session.isLoggedIn);

  const registerHome = await homeModel.find();

  res.render("store/index", {
    homes: registerHome,
    pageTitle: "airbnb Home.com",
    currantPage: "index",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

// get home List
exports.getHome = async (req, res) => {
  const registerHome = await homeModel.find();
  res.render("store/home-list", {
    homes: registerHome,
    pageTitle: "airbnb Home.com",
    currantPage: "home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

// get Booking List
exports.getBookings = (req, res) => {
  res.render("store/booking-list", {
    pageTitle: "My Booking List Details",
    currantPage: "booking-list",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

// get favourite list
exports.getFavourite = async (req, res) => {
  const userId = req.session.user._id;
  const user = await userModel.findById(userId).populate("favourites");
  console.log("user Favourite", user);

  res.render("store/favourite-list", {
    getfavouriteHouse: user.favourites,
    pageTitle: "My favourite List Details",
    currantPage: "favourite-list",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

// get home details
exports.getHoemDetails = async (req, res) => {
  const homeId = req.params.homeId;
  console.log("_id", homeId);
  const home = await homeModel.findById(homeId);

  console.log("home details ", home);

  if (!home) {
    res.redirect("/home");
  } else {
    console.log("home details found", home);
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Details",
      currantPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  }
};

// ============================== post request heandale ==================================

// add favourite
exports.postAddToFavourite = async (req, res) => {
  try {
    const homeId = req.body.id;
    const userId = req.session.user._id;
    const user = await userModel.findById(userId);

    if (!user.favourites.includes(homeId)) {
      user.favourites.push(homeId);
      await user.save();
    }
    res.redirect("/favourite-list");
  } catch (error) {
    console.log("Error while add favourites", error);
  }
};

// remove favourite
exports.postRemoveFromFavourite = async (req, res) => {
  try {
    const homeId = req.params.homeId;
    const userId = req.session.user._id;
    const user = await userModel.findById(userId);

    if (!user.favourites.includes(homeId)) {
      user.favourites = user.favourites.filter((fav) => fav !== homeId);
      await user.save();
    }
    res.redirect("/favourite-list");
  } catch (error) {
    console.log("Error while Remove Favourites", error);
  }
};
