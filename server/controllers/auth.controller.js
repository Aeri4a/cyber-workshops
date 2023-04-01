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

    if (!user)
      return res.status(404).send({ message: "User not found.", code: 0 });

    if (req.body.password != user.password)
      return res
        .status(401)
        .send({ accessToken: null, message: "Invalid password!", code: 0 });

    //Generate Token if login ok
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.secret,
      {
        expiresIn: 60, // 1 min
      }
    );

    res.status(200).send({
      accessToken: token,
      code: 1,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, code: 0 });
  }
};
