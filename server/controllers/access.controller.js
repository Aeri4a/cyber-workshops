exports.allAccess = (req, res) => {
  res.status(200).send("Public content.");
};

exports.userProfile = (req, res) => {
  res.status(200).send({ userId: req.userId, userName: req.userName });
};
