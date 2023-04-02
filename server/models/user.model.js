//User model
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(30),
    },
    password: {
      type: Sequelize.STRING(50),
    },
    twoStepStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    twoStepAscii: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    twoStepHex: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    twoStepBase32: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    twoStepURL: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  });

  return User;
};
