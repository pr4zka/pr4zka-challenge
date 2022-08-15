const peliculas = require("../models/peliculas");
const ImageService = require("../services/imageService");
const movieService = require("../utils/moviesUpdate");
class peliculasControllers {
  
  static async createMovie(req, res) {
    try {
      const { imagen, titulo, fecha, calificacion, personaje_id } = req.body;
      const data = await peliculas.create({
        imagen,
        titulo,
        fecha,
        calificacion,
        personaje_id,
      });
      res.send({ msg: "Pelicula creada correctamente", data });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAll(req, res) {
    try {
      const { filter = "", options = "" } = req.query;
      const movie = await movieService.findAllMovies(filter, options);
      res.send(movie);
    } catch (error) {
      res.json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await peliculas.destroy({
        where: {
          id,
        },
      });
     res.send({ msg: "Pelicula eliminada correctamente", data });
    } catch (error) {
      res.json(error);
    }
  }

  static async getDetail(req, res) {
    try {
      const { id } = req.params;
      const movie = await movieService.findDetailMovie(id);
      res.send(movie);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  }

  static async update(req, res) {
    try {
      const {id} = req.params
      let movie = req.body
      const data = await movieService.update(id, movie);
      res.json({ msg: "Pelicula actualizada correctamente", data });
    } catch (error) {
      res.json(error);
    }
  }

  //asociar pelicula con personaje
  static async asociate(req, res, next) {
    try {
      const character = req.character;
      const movie = req.movie;
       
     await movieService.asociate(movie, character);
   
      res.json({ msg: "Asociado correctamente", movie, character });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const movie_id = req.body.id;
      const image = req.file;
      
      res.json(await ImageService.uploadImageMovie(movie_id, image));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = peliculasControllers;
