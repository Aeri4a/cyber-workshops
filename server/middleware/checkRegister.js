const db = require("../models");
const User = db.user;

const checkUniqueUsername = async (req, res, next) => {
  try {
    // Username
    let username = await User.findOne({
      where: {
        login: req.body.login,
      },
    });

    if (username) {
      return res.status(400).send({ message: "Failed! Username exists!" });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const checkRegister = {
  checkUniqueUsername,
};
module.exports = checkRegister;
