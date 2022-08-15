const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/db');

const Character = sequelize.define('personajes', {
  // Model attributes are defined here
  imagen: {
    type: DataTypes.STRING(250),

  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  historia: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  peso: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
    
});

module.exports = Character;

Character.belongsToMany(require('./peliculas'), {
  through: "charactersMovies",
  as: "peliculas",
  foreignKey: "personajeId"
});