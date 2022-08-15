const ImageHandle = require('../utils/imageHandle')
const CharacterUpdate = require('./characterService')
const MovieService = require('../services/movieService')
const movieservice = new MovieService()
const characterupdate = new CharacterUpdate()
const imagehandle = new ImageHandle();

const uploadCharacterImage = async (personaje_id, file) => {
    const character = await characterupdate.findById(personaje_id)
    
     if(character.imagen){
       await imagehandle.deleteImage(character.imagen)
     }
     console.log(character.imagen)

    const imageURL = await imagehandle.uploadImage(character.nombre, file.buffer, file.mimetype)
    return await characterupdate.update(personaje_id, {imagen: imageURL})
}

const uploadImageMovie = async (id, file) => {
    
     const movie = await movieservice.findById(id)
      if(movie.imagen){
        await imagehandle.deleteImage(movie.imagen)
      }

    const imageURL = await imagehandle.uploadImage(movie.titulo, file.buffer, file.mimetype)
    return await movieservice.update(id, {imagen: imageURL})
}
 


module.exports = {
    uploadCharacterImage,
    uploadImageMovie
}

