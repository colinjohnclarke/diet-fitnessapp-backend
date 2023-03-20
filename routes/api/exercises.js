const express = require("express");
const router = express.Router();
const {
  getallExercisesfromDB,
  addNewExericsetoDB,
  deleteExercisefromDB,
} = require("../../controllers/exericseController");

router
  .route("/")
  .get(getallExercisesfromDB)
  .post(addNewExericsetoDB)
  .delete(deleteExercisefromDB);

module.exports = router;
