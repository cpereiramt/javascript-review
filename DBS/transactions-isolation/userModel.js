const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('bd_test', 'cpereiramt', '123456', {
  host: 'localhost',
  port: '5332',
  dialect: 'postgres'
});

const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

sequelize.sync();
module.exports = {User,sequelize};