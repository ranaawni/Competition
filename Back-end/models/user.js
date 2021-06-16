const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
