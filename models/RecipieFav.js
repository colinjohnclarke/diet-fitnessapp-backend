const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipieFavouritesSchema = new Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  extendedIngredients: {
    type: Array,
  },
  servings: {
    type: String,
  },
  weightWatcherSmartPoints: {
    type: String,
  },
  readyinminutes: {
    type: String,
  },
});

module.exports = mongoose.model("Recipies", RecipieFavouritesSchema);
