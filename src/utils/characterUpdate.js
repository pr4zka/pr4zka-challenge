const characterService = require("../services/characterService");
const character = new characterService();
const ImageHandle = require("./imageHandle");
const imageHandle = new ImageHandle();

const update = async (id, body) => {
  return await character.update(id, body)
}

const finByMovie = async (id) => {
  return await character.findByMovie(id);
}

const getAllCharacter = async (filter) => {
  return await character.getAllCharacter(filter);
}


const remove = async (id) => {
  const data = await character.findById(id);
  imageHandle.deleteImage(data.imagen);
  return await character.delete(id);
};

module.exports = {
  remove,
  getAllCharacter,
  finByMovie,
  update
};
 