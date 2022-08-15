const express = require("express");
const router = express.Router();
const Personajes = require("../controllers/personajes");
const { uplaod } = require("../controllers/uplaodImage");
const {postValidate, editValidator, deleteValidator, postImageValidation} = require('../validators/character/index')


/**
 * @swagger
 * components:
 *  schemas:
 *   Characters:
 *    type: object
 *    properties:
 *     imagen:
 *      type: string
 *      description: Imagen del personaje
 *     nombre:
 *      type: string
 *      description: Nombre del personaje
 *     edad:
 *      type: number
 *      description: Edad del personaje
 *     peso:
 *      type: number
 *      description: Peso del personaje
 *     historia:
 *      type: string
 *      description: Historia del personaje
 */
/**
 * @swagger
 * /api/characters:
 *  post:
 *    summary: Crea un nuevo personaje en la base de datos
 *    tags: [Characters]
 *    parameters:
 *      - in: header
 *        name: Bearer token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Characters'
 *    responses:
 *     200:
 *       description: Personaje creado
 */

router.post("/characters",postValidate, Personajes.createPersonajes);

/**
 * @swagger
 * /api/characters:
 *  get:
 *    summary: Consulta todos los personajes de la base de datos
 *    tags: [Characters]
 *    responses:
 *     200:
 *       description: Lista de Personajes
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Characters'
 */
router.get("/characters", Personajes.getCharacters);

/**
 * @swagger
 * /api/details/{id}:
 *  get:
 *    summary: Consulta el personaje y sus peliculas de la base de datos
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: Id del personaje
 *    responses:
 *     200:
 *       description: Lista de Personajes
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Characters'
 *     404:
 *       description: Personaje no encontrado
 */
router.get("/details/:id", Personajes.getDetails);

/**
 * @swagger
 * /api/characters/{id}:
 *  delete:
 *    summary: Borra los personajes de la base de datos
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: Id del personaje
 *    responses:
 *     200:
 *       description:  Personaje borrado
 *     404:
 *       description: Personaje no encontrado
 */
router.delete("/characters/:id", deleteValidator, Personajes.deletePersonajes);

/**
 * @swagger
 * /api/characters/{id}:
 *  put:
 *    summary: Actualiza el personaje en la base de datos
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: Id del personaje
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Characters'
 *    responses:
 *     200:
 *       description:  Personaje actualizado
 *     404:
 *       description: Personaje no encontrado
 */
router.put("/characters/:id", editValidator ,Personajes.updatePersonajes);

/**
 * @swagger
 * /api/characterBy:
 *  get:
 *    summary: Consulta todos los personajes por nombre y edad
 *    tags: [Characters]
 *    parameters:
 *      - in: query
 *        name: filter[nombre]
 *        schema:
 *         type: string
 *        required: true
 *        description: Ingrese el nombre del personaje o la edad.
 *    responses:
 *     200:
 *       description: Lista los personajes encontrados
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Characters'
 */
router.get("/characterBy", Personajes.getAllPersonajes);

/**
 * @swagger
 * /api/upload/characters:
 *  post:
 *    summary: Subir una imagen al servidor
 *    consumes: multipart/form-data
 *    tags: [Characters]
 *    requestBody:
 *       content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              myFile:
 *                type: string
 *                format: binary
 *    responses:
 *     200:
 *       description: Imagen subida
 */
router.post("/upload/characters",uplaod.single("myFile"), postImageValidation ,Personajes.uploadImage);
module.exports = router;
