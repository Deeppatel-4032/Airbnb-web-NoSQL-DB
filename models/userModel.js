const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
  },
  password: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["guest", "admin"],
    default: "guest",
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homes",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
