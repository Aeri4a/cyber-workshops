const controller = require("../controllers/auth.controller");
const { checkRegister, authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //Login, Register
  app.post(
    "/api/auth/register",
    checkRegister.checkUniqueUsername,
    controller.register
  );
  app.post("/api/auth/login", controller.login);

  //OTP
  app.post("/api/otp/generate", authJwt.verifyToken, controller.otpGenerate);
  app.post("/api/otp/verify", authJwt.verifyToken, controller.otpVerify);
  app.post("/api/otp/disable", authJwt.verifyToken, controller.otpDisable);
  app.post("/api/otp/validate", controller.otpValidate);
};
