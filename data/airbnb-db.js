const mongo = require("mongodb");

const mongoClient = mongo.MongoClient;
let _db;

const mongoConnect = (callBack) => {
  mongoClient
    .connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("Database is connected...!!");
      _db = client.db("airbnb-db");
      callBack();
    })
    .catch((erro) => {
      console.log("Database is connected...!!", erro);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Error Database is not conne");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

// const mongoose = require("mongoose");

// const db = mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("Database is Connected.....!!");
//   })
//   .catch((error) => {
//     console.log("Database is not Connected.....!!");
//   });

// module.exports = db;
