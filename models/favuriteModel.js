// local module

const { getDB } = require("../data/airbnb-db");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDB();
    return db.collection("favourites").insertOne(this);
  }
  static addToFavourite() {}

  static getToFavourite() {}

  static deleteById(delHomeId) {}
};
