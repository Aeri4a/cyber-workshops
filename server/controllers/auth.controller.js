//JWT
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

//Passwords safety - for later use
const bcrypt = require("bcryptjs");

//DB
const db = require("../models");
const User = db.user;

//-=REGISTER, LOGIN, LOGOUT=-
//Register process
exports.register = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send({ message: "Register successfull.", code: 1 });
  } catch (error) {
    res.status(500).send({ message: error.message, code: 0 });
  }
};

//Login process
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) return res.status(404).send({ message: "User not found." });

    if (req.body.password != user.password)
      return res
        .status(401)
        .send({ accessToken: null, message: "Invalid password!" });

    //Generate Token if login ok
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 300, // 5 min
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
