// local module

const { getDB } = require("../data/airbnb-db");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDB();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favourites").insertOne(this);
        }
        return promiseImpl.resolve();
      });
  }

  static getToFavourite() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ homeId: delHomeId });
  }
};
