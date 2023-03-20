const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipieFavouritesSchema = new Schema({
  user: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Recipies", RecipieFavouritesSchema);
