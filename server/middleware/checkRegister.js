const db = require("../models");
const User = db.user;

const checkUniqueUsername = async (req, res, next) => {
  try {
    // Username
    let username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res
        .status(400)
        .send({ message: "Failed! Username exists!", code: 0 });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      code: 0,
    });
  }
};

const checkRegister = {
  checkUniqueUsername,
};
module.exports = checkRegister;
