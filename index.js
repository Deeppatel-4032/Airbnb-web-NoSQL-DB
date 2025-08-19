// External Module
const express = require("express");
const app = express();

// core module
const path = require("path");

// .env file
const dotEnv = require("dotenv");
dotEnv.config();
const PORT = process.env.PORT || 3005;

// local module
const storeRouter = require("./routers/storeRouter");
const adminRoute = require("./routers/adminRouter");
const rootPath = require("./utils/pathUtil");
const errorCon = require("./controllers/errorCon");
const { mongoConnect } = require("./data/airbnb-db");

// static path connect css file
app.use(express.static(path.join(rootPath, "public/css")));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

// routes
app.use(storeRouter);
app.use(adminRoute);

// Error Page
app.use(errorCon.pageNotFound);

mongoConnect((client) => {
  console.log("data connect successfully", client);
  app.listen(PORT, (err) => {
    if (!err) {
      console.log(`server is running on PORT http://localhost:${PORT}/index`);
    }
  });
});
