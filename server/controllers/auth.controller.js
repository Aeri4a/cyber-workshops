//JWT
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

//Passwords safety - for later use
const bcrypt = require("bcryptjs");

//DB
const db = require("../models");
const User = db.user;

//REGISTER, LOGIN, LOGOUT

//Register process
exports.register = async (req, res) => {
  try {
    const user = await User.create({
      login: req.body.login,
      password: req.body.password,
    });
    res.send({ message: "Register successfull" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
