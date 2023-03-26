const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  bodypart: {
    type: String,
  },
  equipment: {
    type: String,
  },
  gifUrl: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  exercise_name: {
    type: String,
  },
  target: {
    type: String,
  },
  colin: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
