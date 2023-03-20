const express = require("express");
const router = express.Router();

const {
  handleNewRecipie,
  getallRecipiesfromDB,
  deleterecipiefromDB,
} = require("../../controllers/recipiesController");

router
  .route("/")
  .get(getallRecipiesfromDB)
  .post(handleNewRecipie)
  .delete(deleterecipiefromDB);

module.exports = router;
