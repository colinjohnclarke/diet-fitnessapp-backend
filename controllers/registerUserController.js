const User = require("../models/User");

const bcrytpt = require("bcrypt");

const handleNewUser = async (req, res) => {
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
    const hashedpwd = await bcrytpt.hash(password, 10);

    const result = await User.create({
      username: user,
      password: hashedpwd,
      email,
    });

    console.log(result);

    res.status(201).json({ message: `New user ${user} created sucessfully` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = handleNewUser;
