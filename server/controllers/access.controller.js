//DB
const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public content.");
};

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
        username: req.userName,
      },
    });

    if (!user) return res.status(401).send({ message: "Fail." });

    res.status(200).send({
      userId: req.userId,
      userName: req.userName,
      otpEnabled: user.twoStepStatus,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
