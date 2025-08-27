// local modules
const homeModel = require("../models/homeModel");

// core module
const fs = require("fs");

// ============================== GET requests ==================================

// Add new home page
exports.getAddHome = (req, res) => {
  res.render("admin/edit-home", {
    pageTitle: "Add Home To Airbnb",
    currantPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

// Edit home page
exports.getEditHome = async (req, res) => {
  try {
    const { homeId } = req.params;
    const editing = req.query.editing === "true";

    const home = await homeModel.findById(homeId);
    console.log("getEdithome >>", home);

    if (!home) {
      console.log("Not Found Editing Page");
      return res.redirect("/admin-home");
    }

    res.render("admin/edit-home", {
      home,
      pageTitle: "Your Edit Home",
      currantPage: "addHome",
      editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error While Get Edit Data", error);
    res.status(500).send("Internal Server Error");
  }
};

// Admin list of homes
exports.getAdminHome = async (req, res) => {
  try {
    const registerHome = await homeModel.find();

    res.render("admin/adminHome-list", {
      homes: registerHome,
      pageTitle: "Admin house Page",
      currantPage: "admin-home",
      editing: true,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error While Get adminHome Data", error);
    res.status(500).send("Internal Server Error");
  }
};

// ============================== POST requests ==================================

// Add new home
exports.postAddHome = async (req, res) => {
  try {
    console.log("Home Registration successful for : ", req.body);

    const { name, price, location, rating, description } = req.body;
    const photo = req.file ? req.file.path : null;

    const createHome = new homeModel({
      name,
      price,
      location,
      rating,
      photo,
      description,
    });
    await createHome.save();
    console.log("Home saved successfully", createHome);
    res.redirect("/admin-home");
  } catch (error) {
    console.log("Error while Home Registration: ", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update home
exports.postUpdateHome = async (req, res) => {
  try {
    const { homeId } = req.params;

    console.log("Update Id", homeId);

    let updateHome = await homeModel.findById(homeId);

    if (!updateHome) {
      console.log("Home not found");
      return res.redirect("/admin-home");
    }

    console.log("Home Edit Details Before Update", updateHome);

    updateHome.name = req.body.name;
    updateHome.price = req.body.price;
    updateHome.location = req.body.location;
    updateHome.rating = req.body.rating;
    updateHome.description = req.body.description;

    if (req.file) {
      fs.unlink(updateHome.photo, (err) => {
        if (err) {
          console.log("Delete previce image Path");
        }
      });
      updateHome.photo = req.file.path;
    }

    await updateHome.save();

    console.log("Home details updated successfully", updateHome);
    res.redirect("/admin-home");
  } catch (error) {
    console.log("Error while updating home", error);
    res.status(500).send("Something went wrong");
  }
};

// Delete home
exports.postDeleteHome = async (req, res) => {
  try {
    const { homeId } = req.params;
    const deleteHome = await homeModel.findByIdAndDelete(homeId);
    console.log("Home Deleting >>> ", deleteHome);
    res.redirect("/admin-home");
  } catch (error) {
    console.log("Error while deleting home...", error);
    res.status(500).send("Server Error");
  }
};
