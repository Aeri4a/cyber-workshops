//User model
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: Sequelize.STRING(30),
    },
    password: {
      type: Sequelize.STRING(50),
    },
    twoStepStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    twoStepKey: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  });

  return User;
};
