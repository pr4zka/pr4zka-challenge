const { check } = require("express-validator");
const validatorResult = require("../validatorResullt");
const characterService = require("../../services/characterService");
const characterservice = new characterService();
const movieService = require('../../services/movieService')
const movieservice = new movieService()
const AppError = require('../../errors/appError')
const { imageRequired } = require('../image')

const _titleOptional = check("titulo").optional();
const _titleRequired = check("titulo").isEmpty();
const _fechaOptional = check("fecha").optional().isDate();
const _fechaRequired = check("fecha").isEmpty().isDate();

const idExist = check("id").custom(
  async (id = '') => {
    const movie = await movieservice.findById(id);
    if (!movie) {
      throw new AppError(`Movie with id ${id} not found`, 404);
    }
  }
)

const titleExist = check("titulo").custom(
  async (titulo = '') => {
    const movie = await movieservice.findByTitle(titulo);
    if(!movie){
       throw new AppError('The title exist in DB', 400)
    }
  }
)

const calificacion = check('calificacion').isIn(['1', '2', '3', '4', '5']).isNumeric().notEmpty()


const idIsNumeric = (name) => {
  return check(name).isNumeric();
};
const idRequired = (name) => {
  return check(name).not().isEmpty();
};

const idCharacterExist = check("idCharacter").custom(async (idCharacter = "", { req }) => {
    const c =  await characterservice.findById(idCharacter);
    if (!c) {
      throw new AppError("El personaje no existe", 400);
    }
    req.character = c;

  }
);

const idMovieExist = check("idMovie").custom(async (idMovie = "", { req }) => {
  const m = await movieservice.findById(idMovie);
  if (!m) {
    throw new AppError("La pelicula no existe", 400);
  }
  req.movie = m;
 
});

const getDetailMovie = [
  idRequired("id"),
  idIsNumeric("id"),
  idExist,
  validatorResult
]

const postMovieValidator = [
  _titleRequired,
  _fechaRequired,
  titleExist,
  calificacion,
  validatorResult
]

const putValidator = [
  idRequired("id"),
  idIsNumeric("id"),
  idExist,
  _titleRequired,
  _titleOptional,
  _fechaOptional,
  _fechaRequired,
  validatorResult

]

const postImageValidator = [
 idExist,
 idIsNumeric("id"),
 idRequired("id"),
 imageRequired,
 validatorResult
]

const asociateValidations = [
  idIsNumeric("idCharacter"),
  idRequired("idCharacter"),
  idIsNumeric("idMovie"),
  idRequired("idMovie"),
  idCharacterExist,
  idMovieExist,
  validatorResult
];

module.exports = {
  asociateValidations,
  postImageValidator,
  putValidator,
  postMovieValidator,
  getDetailMovie
};
