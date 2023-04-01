const controller = require("../controllers/access.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  /*
  app.use(function (req, res, next) {
    res.header("x-access-token");
    next();
  });
  */

  app.get("/api/access/all", controller.allAccess);

  app.get("/api/access/user", authJwt.verifyToken, controller.userProfile);
};
