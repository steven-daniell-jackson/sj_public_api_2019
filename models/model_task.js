const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    githubLink: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
