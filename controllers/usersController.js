const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//get users

const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400).json({ message: "no users found" });
  }

  res.status(200).json({ users });
  console.log(users);
};

// create user

const createNewUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ message: " all fields required to register" });
  }

  // check DB for existing user

  const duplicate = await User.findOne({ username: username }).lean().exec();

  if (duplicate) {
    res.status(409).json({ message: "username already used" });
  }
  try {
    //
    const hashedpwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      username: username,
      password: hashedpwd,
      email,
    });

    console.log(result);

    res
      .status(201)
      .json({ message: `New user ${username} created successfully` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update user

const updateUser = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ message: "id required" });
  }
  const user = await User.findOne({ __id: req.body.id }).exec();

  if (req.body.username) {
    user.username = req.body.username;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

  const result = await user.save();

  res
    .status(204)
    .json({ message: `user ${req.body.username} sucessfully created` });
  res.json(result);
};

// delete user
const deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "id required" });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  console.log("deleted");
  if (!user) {
    res.status(204).json({ message: ` NO Employee matches ID ${req.body.id}` });
  }

  try {
    const result = await User.deleteOne({ _id: req.body.id });

    res.status(201).json({ message: `${user.username} deleted` });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteUser, updateUser, createNewUser, getAllUsers };
