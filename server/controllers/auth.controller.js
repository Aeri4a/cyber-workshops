//JWT
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

//OTP
const speakeasy = require("speakeasy");

//Passwords safety - for later use
const bcrypt = require("bcryptjs");

//DB
const db = require("../models");
const User = db.user;

//-=REGISTER, LOGIN=-
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

//-=TWO STEP AUTHENTICATION=-
//Generate OTP
exports.otpGenerate = async (req, res) => {
  try {
    const { userId, userName } = req;
    const { ascii, hex, base32, otpauth_url } = speakeasy.generateSecret({
      issuer: "Cybero",
      name: userName,
      length: 15,
    });

    const user = await User.findOne({
      where: {
        id: userId,
        username: userName,
      },
    });

    if (!user) return res.status(401).send({ message: "Not found!" });

    user.set({
      twoStepAscii: ascii,
      twoStepHex: hex,
      twoStepBase32: base32,
      twoStepURL: otpauth_url,
    });
    await user.save();

    res.status(200).send({ base32, otpauth_url });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Verify OTP
exports.otpVerify = async (req, res) => {
  try {
    const { userId, userName } = req;
    const { token } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
        username: userName,
      },
    });

    if (!user) return res.status(401).send({ message: "Not found!" });

    const verified = speakeasy.totp.verify({
      secret: user.twoStepBase32,
      encoding: "base32",
      token,
    });

    if (!verified) return res.status(401).send({ message: "Fail." });

    user.twoStepStatus = 1;
    await user.save();
    res.status(200).send({ otpVerified: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Validate OTP
exports.otpValidate = async (req, res) => {
  try {
    const { userId, userName } = req;
    const { token } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
        username: userName,
      },
    });

    if (!user) return res.status(401).send({ message: "Not found!" });

    const verified = speakeasy.totp.verify({
      secret: user.twoStepBase32,
      encoding: "base32",
      token,
    });

    if (!verified) return res.status(401).send({ message: "Fail." });

    res.status(200).send({ otpValid: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.otpDisable = async (req, res) => {
  try {
    const { userId, userName } = req;

    const user = await User.findOne({
      where: {
        id: userId,
        username: userName,
      },
    });

    if (!user) return res.status(401).send({ message: "Not found!" });

    user.twoStepStatus = 0;
    await user.save();
    res.status(200).send({ otpDisabled: true });
  } catch (error) {
    res.sent(500).send({ message: error.message });
  }
};
