var mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

// const User = mongoose.model("User", UserSchema);

module.exports = mongoose.model("User", UserSchema);
