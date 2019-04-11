const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    dateOfBirth: {
      type: String
    },
    address: {
      type: String
    },
    ethnicity: {
      type: String
    },
    contactNumber: {
      type: String
    },
    hobbies: {
      type: String
    },
    profileImg: {
      type: String
    },
    priviledges: {
      type: String
    },
    active: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
