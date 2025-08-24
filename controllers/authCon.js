const { check, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// ============================== get request handle ==================================

// get logInForm
exports.getLogInForm = (req, res) => {
  res.render("auth/logInForm", {
    pageTitle: "Login To Airbnb",
    currantPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

// get user signUpForm page
exports.getSignUpFrom = (req, res) => {
  res.render("auth/signUpForm", {
    pageTitle: "SignUp To Airbnb",
    currantPage: "signUp",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
      user: {},
    },
  });
};

// ============================== post request handle ==================================

// post new login user
exports.postLogIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/logInForm", {
      pageTitle: "Login To Airbnb",
      currantPage: "login",
      isLoggedIn: false,
      errors: ["user does not Exist"],
      oldInput: { email },
      user: {},
    });
  }

  // password match
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(422).render("auth/logInForm", {
      pageTitle: "Login To Airbnb",
      currantPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: { email },
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

// post new register user
exports.postSignUp = [
  check("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name must be at least 2 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name should contain only alphabets"),

  check("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last Name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*|?.,<>{}]/)
    .withMessage("Password must contain at least one special character"),

  check("com_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
    .notEmpty()
    .withMessage("Please select your user type")
    .isIn(["guest", "admin"])
    .withMessage("Invalid user type"),

  check("terms").custom((value) => {
    if (value !== "on") {
      throw new Error("Please accept the Terms and Conditions");
    }
    return true;
  }),

  (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signUpForm", {
        pageTitle: "SignUp To Airbnb",
        currantPage: "signUp",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
        user: {},
      });
    }

    bcrypt.hash(password, 10).then((hashpassword) => {
      const createUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashpassword,
        userType,
      });

      // user save db
      createUser
        .save()
        .then(() => {
          res.redirect("/logInForm");
        })
        .catch((error) => {
          console.log("Error While create user", error);
          return res.status(422).render("auth/signUpForm", {
            pageTitle: "SignUp To Airbnb",
            currantPage: "signUp",
            isLoggedIn: false,
            errors: errors.array().map((err) => err.message),
            oldInput: { firstName, lastName, email, password, userType },
            user: {},
          });
        });
    });
  },
];

// post new logout user
exports.postlogOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/logInForm");
  });
};
