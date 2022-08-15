const express = require("express");
const router = express.Router();
const movies = require("../controllers/peliculas");
const authMiddleware = require("../middlewares/session");
const { uplaod } = require("../controllers/uplaodImage");
const { asociateValidations, postImageValidator, putValidator, postMovieValidator, getDetailMovie } = require("../validators/movies/index");

/**
 * @swagger
 * components:
 *  schemas:
 *   Movies:
 *    type: object
 *    properties:
 *     imagen:
 *      type: string
 *      description: Imagen de la pelicula
 *     titulo:
 *      type: string
 *      description: Nombre de la pelicula
 *     fecha:
 *      type: date
 *      pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *      example: 2020-01-01
 *      description: fecha de la pelicula
 *     calificacion:
 *      type: number
 *      description: calificacion de la pelicula
 *     genderTypeId:
 *      type: number
 *      description: id del genero
 */
/**
 * @swagger
 * /api/movie:
 *  post:
 *    summary: Crea una nueva pelicula en la base de datos
 *    tags: [Movies]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Movies'
 *    responses:
 *     200:
 *       description: Personaje creado
 *     400:
 *     description: Error al crear la pelicula
 */
router.post("/movie", postMovieValidator ,movies.createMovie);

/**
 * @swagger
 * /api/movies:
 *  get:
 *    summary: Consulta todos las peliculas de la base de datos
 *    tags: [Movies]
 *    parameters:
 *      - in: query
 *        name: filter[titulo]
 *        example: Avengers
 *      - in: query
 *        example: ID Genero
 *        name: filter[genre]
 *      - in: query
 *        name: options[order]
 *        example: fecha;ASC o DESC
 *    responses:
 *     200:
 *       description: Lista las peliculas
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Movies'
 */
router.get("/movies",authMiddleware ,movies.getAll);

/**
 * @swagger
 * /api/movie/details/{id}:
 *  get:
 *    summary: Consulta una pelicula por su id
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: Id del personaje
 *    responses:
 *     200:
 *       description: Lista de la pelicula
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Movies'
 *     404:
 *       description: Personaje no encontrado
 */
router.get("/movie/detail/:id" ,getDetailMovie ,movies.getDetail);

/**
 * @swagger
 * /api/movie/{id}:
 *  delete:
 *    summary: Borra la pelicula de la base de datos
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: Id de la pelicula
 *    responses:
 *     200:
 *       description:  Pelicula borrada
 *     404:
 *       description: Pelicula no encontrada
 */
router.delete("/movie/:id", authMiddleware, movies.delete);

/**
 * @swagger
 * /api/movie/{id}:
 *  put:
 *    summary: Actualiza la pelicula en la base de datos
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: Id de la pelicula
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Movies'
 *    responses:
 *     200:
 *       description:  Personaje actualizado
 *     404:
 *       description: Personaje no encontrado
 */
router.put("/movie/:id",putValidator, authMiddleware, movies.update);

/**
* @swagger
* /api/upload/movie:
*  post:
*    summary: Subir una imagen al servidor
*    consumes: multipart/form-data
*    tags: [Movies]
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
router.post("/upload/movie", postImageValidator ,uplaod.single("myFile"), movies.uploadImage);

/**
 * @swagger
 * /api/movies/{idMovie}/character/{idCharacter}:
 *  put:
 *    summary: Asocia un personaje a una pelicula
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: idMovie
 *      - in: path
 *        name: idCharacter
 *    content:
 *    responses: 
 *     200:
 *       description: Pelicula asociada correctamente
 *     400:
 *       description: Algo ocurrio al asociar
 */
router.put("/movies/:idMovie/character/:idCharacter",
  asociateValidations,
  movies.asociate
);
module.exports = router;
