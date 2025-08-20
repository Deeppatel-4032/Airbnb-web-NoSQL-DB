const homeModel = require("../models/homeModel");
const favouriteModel = require("../models/favuriteModel");

exports.getIndex = (req, res) => {
  homeModel.find().then((registerHome) => {
    res.render("store/index", {
      homes: registerHome,
      pageTitle: "airbnb Home.com",
      currantPage: "index",
    });
  });
};

exports.getHome = (req, res) => {
  homeModel.find().then((registerHome) => {
    res.render("store/home-list", {
      homes: registerHome,
      pageTitle: "airbnb Home.com",
      currantPage: "home",
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/booking-list", {
    pageTitle: "My Booking List Details",
    currantPage: "booking-list",
  });
};

exports.getFavourite = (req, res) => {
  favouriteModel
    .find()
    .populate("homeId")
    .then((Favourite) => {
      const favouriteHouse = Favourite.map((fav) => fav.homeId);
      res.render("store/favourite-list", {
        getfavouriteHouse: favouriteHouse,
        pageTitle: "My favourite List Details",
        currantPage: "favourite-list",
      });
    });
};

exports.getHoemDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log("_id", homeId);

  homeModel.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/home");
    } else {
      console.log("home details found", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currantPage: "home",
      });
    }
  });
};

exports.postAddToFavourite = (req, res) => {
  const homeId = req.body.id;
  console.log("add to favourites", homeId);
  favouriteModel
    .findOne({ homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already Existing Favourite Add");
      } else {
        fav = favouriteModel({ homeId });
        fav
          .save()
          .then((result) => {
            console.log("favourit add successfully", result);
          })
          .catch((error) => {
            console.log("error while marking favourite : ", error);
          });
      }
      res.redirect("/favourite-list");
    })
    .catch((error) => {
      console.log("Error while not found Favourite", error);
    });
};

exports.postRemoveFromFavourite = (req, res) => {
  let { homeId } = req.params;

  favouriteModel
    .findOneAndDelete(homeId)
    .then((result) => {
      console.log("favourit Remove successfully", result);
    })
    .catch((error) => {
      console.log("error while marking favourite : ", error);
    })
    .finally(() => {
      res.redirect("/favourite-list");
    });
};
