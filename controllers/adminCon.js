// local modules
const homeModel = require("../models/homeModel");

// ============================== get request heandale ==================================

exports.getAddHome = (req, res) => {
  res.render("admin/edit-home", {
    pageTitle: "Add Home To Airbnb",
    currantPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  homeModel.findById(homeId).then((home) => {
    if (!home) {
      console.log("Not Found Editing Page");
      return res.redirect("/admin-home");
    }

    res.render("admin/edit-home", {
      home: home,
      pageTitle: "Your Edite Home",
      currantPage: "addHome",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getAdminHome = (req, res) => {
  homeModel.find().then((registerHome) => {
    res.render("admin/adminHome-list", {
      homes: registerHome,
      pageTitle: "Admin house Page",
      currantPage: "admin-home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

// ============================== post request heandale ==================================

// admin add new Homes
exports.postAddHome = (req, res) => {
  console.log("Home Registeration successful for : ", req.body);

  const { name, price, location, rating, imageUrl, description } = req.body;

  const createHome = new homeModel({
    name,
    price,
    location,
    rating,
    imageUrl,
    description,
  });
  createHome.save().then((result) => {
    console.log("Home saved successfully", result);
  });
  res.redirect("/admin-home");
};

// admin edit/update Home
exports.postUpdateHome = (req, res) => {
  const { id, name, price, location, rating, imageUrl, description } = req.body;

  homeModel
    .findById(id)
    .then((home) => {
      if (!home) {
        console.log("home is not Found");
        res.redirect("/admin-home");
      }
      (home.name = name),
        (home.price = price),
        (home.location = location),
        (home.rating = rating),
        (home.imageUrl = imageUrl),
        (home.description = description);
      home
        .save()
        .then((result) => {
          console.log("home Details update successfully", result);
        })
        .catch((error) => {
          console.log("home Details not update successfully", error);
        });
      res.redirect("/admin-home");
    })
    .catch((error) => {
      console.log("Error while finding home", error);
    });
};

// admin Delete Home
exports.postDeleteHome = (req, res) => {
  let { homeId } = req.params;

  homeModel.findByIdAndDelete(homeId).then((error) => {
    if (error) {
      console.log("error while Deleteing >>> ", error);
    }
    res.redirect("/admin-home");
  });
};
