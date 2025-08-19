const Favourite = require("../models/favuriteModel");
const home = require("../models/homeModel");

exports.getIndex = (req, res) => {
  home.fetchAll().then((registerHome) => {
    res.render("store/index", {
      homes: registerHome,
      pageTitle: "airbnb Home.com",
      currantPage: "index",
    });
  });
};

exports.getHome = (req, res) => {
  home.fetchAll().then((registerHome) => {
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
  Favourite.getToFavourite((Favourites) => {
    home.fetchAll().then((registerHome) => {
      const favouriteHouse = registerHome.filter((home) =>
        Favourites.includes(home.id)
      );
      res.render("store/favourite-list", {
        getfavouriteHouse: favouriteHouse,
        pageTitle: "My favourite List Details",
        currantPage: "favourite-list",
      });
    });
  });
};

exports.getHoemDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log("_id", homeId);

  home.findById(homeId).then((home) => {
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
  const { homeId } = req.body;
  console.log("add to favourites", homeId);
  const addFav = new Favourite(homeId);
  addFav
    .save()
    .then((result) => {
      console.log("favourit add successfully", result);
    })
    .catch((error) => {
      console.log("error while marking favourite : ", error);
    })
    .finally(() => {
      res.redirect("/favourite-list");
    });
};

exports.postRemoveFromFavourite = (req, res) => {
  let { homeId } = req.params;

  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("error while Deleteing >>> ", error);
    }
    res.redirect("/favourite-list");
  });
};
