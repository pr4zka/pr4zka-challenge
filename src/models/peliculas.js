const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/db');

const Movie = sequelize.define('peliculas', {
  // Model attributes are defined here
  imagen: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  titulo: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {

});

module.exports = Movie;

Movie.belongsToMany(require('./Personajes'), {
  through: "charactersMovies",
  as: "Personajes",
  foreignKey: "movieId"
});


Movie.belongsTo(require('./generos'), {
  foreignKey: 'genderTypeId',
  targetKey: 'id',
  as: 'genderType'
});