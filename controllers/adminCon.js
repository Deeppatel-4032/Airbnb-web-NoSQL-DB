const home = require("../models/homeModel");

exports.getAddHome = (req, res) => {
  res.render("admin/edit-home", {
    pageTitle: "Add Home To Airbnb",
    currantPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Not Found Editing Page");
      return res.redirect("/admin-home");
    }

    res.render("admin/edit-home", {
      home: home,
      pageTitle: "Your Edite Home",
      currantPage: "addHome",
      editing: editing,
    });
  });
};

exports.getAdminHome = (req, res) => {
  home.fetchAll().then((registerHome) => {
    res.render("admin/adminHome-list", {
      homes: registerHome,
      pageTitle: "Admin house Page",
      currantPage: "admin-home",
    });
  });
};

exports.postAddHome = (req, res) => {
  console.log("Home Registeration successful for : ", req.body);

  const { name, price, location, rating, imageUrl, description } = req.body;

  const createHome = new home(
    name,
    price,
    location,
    rating,
    imageUrl,
    description
  );
  createHome.save().then(() => {
    console.log("Home saved successfully");
  });
  res.redirect("/admin-home");
};

exports.postUpdateHome = (req, res) => {
  const { id, name, price, location, rating, imageUrl, description } = req.body;

  const updateHome = new home(
    name,
    price,
    location,
    rating,
    imageUrl,
    description,
    id
  );
  updateHome.save().then((result) => {
    console.log("home Details update successfully", result);
  });

  res.redirect("/admin-home");
};

exports.postDeleteHome = (req, res) => {
  let { homeId } = req.params;

  home.deleteById(homeId).then((error) => {
    if (error) {
      console.log("error while Deleteing >>> ", error);
    }
    res.redirect("/admin-home");
  });
};
