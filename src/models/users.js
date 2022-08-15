const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const usuarios = sequelize.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = usuarios;
