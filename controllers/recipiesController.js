const RecipieFavouritesSchema = require("../models/RecipieFav");
const mongoose = require("mongoose");
const express = require("express");

const getallRecipiesfromDB = async (req, res) => {
  const recipies = await RecipieFavouritesSchema.find();

  if (!recipies) {
    return res.status(400).json({ message: "no recipies saved in DB" });
  }
  console.log("recipies from DB", recipies);

  return res.status(200).json({ recipies });
};

const handleNewRecipie = async (req, res) => {
  const { user, name } = req.body;

  const recipieobject = { user, name };

  try {
    console.log(recipieobject);
    const savedrecipies = await RecipieFavouritesSchema.create({
      user: user,
      name: name,
    });

    console.log(savedrecipies);
    res.status(201).json({
      message: `New recipie ${recipieobject.name} created sucessfully`,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleterecipiefromDB = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "id required" });
  }

  const recipie = await RecipieFavouritesSchema.findOne({
    _id: req.body.id,
  }).exec();
  if (!recipie) {
    res.status(204).json({ message: "No recipie matches" });
  }
  try {
    const result = await RecipieFavouritesSchema.deleteOne({
      _id: req.body.id,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleNewRecipie,
  getallRecipiesfromDB,
  deleterecipiefromDB,
};
