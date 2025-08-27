// External Module
const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const app = express();

// core module
const path = require("path");

// .env file
const dotEnv = require("dotenv");
dotEnv.config();
const PORT = process.env.PORT || 3005;
const MONGODB_URL = process.env.MONGODB_URL;

// local module
const storeRouter = require("./routers/storeRouter");
const adminRoute = require("./routers/adminRouter");
const authRouter = require("./routers/authRouter");
const rootPath = require("./utils/pathUtil");
const errorCon = require("./controllers/errorCon");

// view page show set
app.set("view engine", "ejs");
app.set("views", "views");

// static path connect css file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootPath, "public/css")));
app.use("/public", express.static(path.join(rootPath, "public")));
app.use("/home-details/public", express.static(path.join(rootPath, "public")));

const store = new mongodbStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

// express-session
app.use(
  expressSession({
    secret: "jay ho",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

// cookie Check
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

// routes
app.use(storeRouter);
app.use(adminRoute);
app.use(authRouter);

// Error Page
app.use(errorCon.pageNotFound);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("database is connecting...!!");
    app.listen(PORT, (err) => {
      if (!err) {
        console.log(`server is running on PORT http://localhost:${PORT}`);
      }
    });
  })
  .catch((error) => {
    console.log("database is not connecting...!!", error);
  });
