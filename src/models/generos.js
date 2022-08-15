const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/db');


const GenderType = sequelize.define('GenderType', {
  // Model attributes are defined here
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = GenderType;

const Movie = require('./peliculas');
GenderType.hasMany(Movie, {
  foreignKey: 'genderTypeId',
  sourceKey: 'id',
})