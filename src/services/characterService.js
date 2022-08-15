const peliculas = require("../models/peliculas");
const character = require("../models/Personajes");
const { Op } = require("sequelize");

class CharacterService {
  async getAllCharacter({ nombre, edad}) {
    let where = {};
    if (nombre) {
      where.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (edad) {
      where.edad = { [Op.like]: `%${edad}%` };
    }
      return await character.findAll({
        where,
        attributes: ["nombre", "edad"],
      })
  }
 
  async findByMovie(id){
   return await character.findByPk(id, {
     include: [
       'peliculas'
     ]
   })
  }

  async findByName(name) {
   return await character.findOne({
      where: {
        nombre : name
      }
   })
  }


  async findById(id) {
    return await character.findByPk(id);
  }

  async findMovie(id) {
    return await character.findByPk(id, {
      include: [
        {
          model: peliculas,
          as: "peliculas",
        },
      ],
    });
  }

  async update(id, body) {
    return await character.update(body, {
      where: {
        id: id,
      },
    });
  }
  async delete(id) {
    return await character.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = CharacterService;
