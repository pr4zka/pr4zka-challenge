const { check } = require("express-validator");
const validatorResult = require("../validatorResullt");
const AppError = require('../../errors/appError')
const { imageRequired } = require('../image')
const characterservice = require('../../services/characterService')
const characterService = new characterservice();

const _nameRequired = check("nombre").not().notEmpty();
const _idIsNumeric = check("id").isNumeric().notEmpty()
const _idRequired = check("id").not().notEmpty()
const _edadIsNumeric = check("edad").isNumeric().notEmpty()
const _pesoIsNumeric = check("peso").isNumeric().notEmpty()
const _historia = check("historia").not().notEmpty()




const _idExist = check("id").custom(
    async (id = '') => {
      const c = await characterService.findById(id);
      if (!c) {
        throw new AppError(`Character with id ${id} not found`, 404);
      }
    }
  )

const _nameExist = check("nombre").custom(
    async (nombre = "") => {
        const name = await characterService.findByName(nombre)
        if(name){
           throw new AppError(`Name already exist in BD`)
        }
    }
)


const postValidate = [
  _nameRequired,
  _nameExist,
  _edadIsNumeric,
  _pesoIsNumeric,
  _historia,
  validatorResult
]


const editValidator = [
 _idIsNumeric,
 _idExist,
 _edadIsNumeric,
 _pesoIsNumeric,
 _nameExist,
 validatorResult
]

const deleteValidator = [
  _idExist,
  _idIsNumeric,
  validatorResult
]

const postImageValidation = [
  _idIsNumeric,
  _idExist,
  imageRequired,
  _idRequired,
  validatorResult
]


module.exports ={ 
  postValidate,
  editValidator,
  deleteValidator,
  postImageValidation
}