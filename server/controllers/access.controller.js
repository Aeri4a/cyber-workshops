exports.allAccess = (req, res) => {
  res.status(200).send("Public content.");
};

exports.userProfile = (req, res) => {
  res.status(200).send({ userId: req.id, userName: req.username });
};
