const controller = require("../controllers/auth.controller");
const { checkRegister } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/register",
    checkRegister.checkUniqueUsername,
    controller.register
  );

  app.post("/api/auth/login", controller.login);
};
