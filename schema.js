const mongoose = require("mongoose");
const unName = require("./randomname");

const commentSchema = new mongoose.Schema({
//   username: unName.genName(),
  text: {
    type: String,
    required: true,
  }
});

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
