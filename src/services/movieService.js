const movies = require("../models/peliculas");
const { Op } = require("sequelize");


class movieService {
  
  async findAllMovies({ titulo, genderTypeId, fecha }, {order}) {
    let where = {};
    if (titulo) {
      where.titulo = { [Op.like]: `%${titulo}%` };
    }
    if (genderTypeId) {
      where.genre = { [Op.like]: `%${genre}%` };
    }
    if(fecha){
      where.fecha = { [Op.like]: `%${fecha}%` };
    }
    let config = {
      where,
      attributes: ['titulo','fecha','imagen', 'genderTypeId'],

    }
     if(order){
       config.order = [order.split(';')]
     }
    return await movies.findAll(config);
  }

  async findById(id) {
    return await movies.findByPk(id);
  }

  async findByTitle(titulo){
    return await movies.findOne({
      where: {
        titulo
      }
    })
  }

  //update image
  async update(id, movie) {
    return await movies.update(movie, {
      where: {
        id,
      },
    });
  }

  //detalle pelicula
  async findDetailMovie(id) {
    return await movies.findByPk(id,{
      include: [
        'Personajes',
        'genderType'
      ],
      attributes: ['id', 'titulo', 'fecha', 'calificacion', 'imagen', 'genderTypeId']
    })
  }

  //delete image
  async delete(id) {
    return await movies.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = movieService;
