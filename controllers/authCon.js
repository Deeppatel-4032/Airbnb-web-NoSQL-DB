// get login users
exports.getLogInForm = (req, res) => {
  res.render("auth/logInForm", {
    pageTitle: "Login ToAirbnb",
    currantPage: "addHome",
    isLoggedIn: false,
  });
};

// post new loging user
exports.postLogIn = (req, res) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  res.redirect("/");
};

// post new logout user
exports.postlogOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/logInForm");
  });
};
