const controller = require("../controllers/access.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/access/all", controller.allAccess);

  app.get("/api/access/user", authJwt, controller.userProfile);
};
