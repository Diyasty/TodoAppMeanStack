const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("todos", schema);
