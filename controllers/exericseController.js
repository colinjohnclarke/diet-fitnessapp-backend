const ExerciseSchema = require("../models/Exercise");
const RecipieFav = require("../models/RecipieFav");

const getallExercisesfromDB = async (req, res) => {
  const exercises = await ExerciseSchema.find();

  if (!exercises) {
    return res.status(400).json({ message: "no exericses in DB" });
  }

  console.log("exercises from DB: ", exercises);

  return res.status(200).json({ exercises });
};

const addNewExericsetoDB = async (req, res) => {
  const newexericse = ({
    bodypart,
    equipment,
    gifurl,
    id,
    username,
    target,
    exercise_name,
  } = req.body);

  const newexerciseobj = {
    bodypart,
    equipment,
    gifurl,
    id,
    username,
    target,
    exercise_name,
  };

  try {
    const savedexercise = await ExerciseSchema.create(newexerciseobj);
    console.log("saved exercises", savedexercise);
    return res.status(201).json({
      message: `Exericse${savedexercise.exercise_name} wassaved to DB`,
    });
  } catch (error) {
    res.status(400).json({
      message: ` Error Exericse${savedexercise.exercise_name} was NOT saved to DB`,
    });
    console.log(error);
  }
};

const deleteExercisefromDB = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "no id provided" });
  }

  const exercise = await ExerciseSchema.findOne({
    _id,
  }).exec();

  if (!exercise) return res.status(204).json({ message: "no exercise found" });

  try {
    result = await ExerciseSchema.deleteOne({
      _id,
    }).exec();
    console.log("deleted result", result);
    res
      .status(200)
      .json({ message: `Exercise${_id} sucessfully deleted from DB` });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ message: `Exercise${_id} NOT DELETED` });
  }
};

module.exports = {
  getallExercisesfromDB,
  addNewExericsetoDB,
  deleteExercisefromDB,
};
