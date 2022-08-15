const generos = require("../models/generos");

class generosControllers {
  static async getAll(req, res) {
    try {
      const data = await generos.findAll();
      res.send(data);
    } catch (error) {
      res.json(error);
    }
  }

  static async create(req, res) {
    try {
      const { nombre } = req.body;
      const newData = await generos.create({
        nombre
      });
      res.send({ msg: "Genero creado correctamente", newData });
    } catch (error) {
      res.send(error);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await generos.destroy({
        where: {
          id: id,
        },
      });
      res.send({ msg: "Genero eliminado", data });
    } catch (error) {
      res.json(error);
    }
  }


  static async update(req, res){
   try {
   
    const {id} = req.params
    const {nombre} = req.body
    const data = await generos.findByPk(id)
    data.nombre = nombre;
    await data.save();
    res.send({msg: "Genero actualizado", data})
   } catch (error) {
    res.json(error)
   }
  }
}

module.exports = generosControllers;
