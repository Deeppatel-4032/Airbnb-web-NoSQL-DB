const mongoose = require("mongoose");
// const favouriteModel = require("./favuriteModel");

const homeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  description: {
    type: String,
  },
});

// homeSchema.pre("findOneAndDelete", async function (next) {
//   const homeId = this.getQuery()._id;
//   await favouriteModel.deleteMany({ homeId });
//   next();
// });

module.exports = mongoose.model("homes", homeSchema);
