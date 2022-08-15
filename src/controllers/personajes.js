const Personajes = require("../models/Personajes");
const ImageService = require("../services/imageService");
const characterService = require("../utils/characterUpdate");

//controllers
class PersonajesControllers {
  static async getAllPersonajes(req, res, next) {
    try {
      const { filter = "" } = req.query;
      const character = await characterService.getAllCharacter(filter);
      res.json({ msg: "Personajes encontrados", character });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getPersonajes(req, res) {
    res.send("personajes");
  }

  static async createPersonajes(req, res) {
    try {
      const pj = req.body;
      const data = await Personajes.create(pj);
      res.send({ data });
      console.log(pj);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async deletePersonajes(req, res, next) {
    try {
      const { id } = req.params;
      const data = characterService.remove(id);
      res.send({ msg: "Personaje eliminado", data });
    } catch (error) {
      res.next(error);
    }
  }

  static async updatePersonajes(req, res) {
    try {
       const { id } = req.params;
       const body = req.body;
       const data = await characterService.update(id, body)
       res.json({ msg: "Pelicula actualizada correctamente", data });
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  }

  static async getCharacters(req, res) {
    try {
      const data = await Personajes.findAll({
        attributes: ["imagen", "nombre"],
      });
      res.send({ msg: "Personajes encontrados", data });
    } catch (error) {
      res.json(error);
    }
  }

  static async getDetails(req, res) {
    try {
      const { id } = req.params;
      const result = await characterService.finByMovie(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }

  //aca tengo que hacer que actualize la imagen de s3
  static async uploadImage(req, res, next) {
    try {
      const personaje_id = req.body.id;
      const image = req.file;
      res.json(await ImageService.uploadCharacterImage(personaje_id, image));
    } catch (error) {
      next(error);
      console.error(error);
    }
  }
}

module.exports = PersonajesControllers;
