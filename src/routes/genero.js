const express = require("express");
const router = express.Router();
const genero = require("../controllers/generos");
const tokenMiddleware = require("../middlewares/session");


/**
 * @swagger
 * components:
 *  schemas:
 *   Genero:
 *    type: object
 *    properties:
 *     nombre: 
 *      type: string
 *      description: Nombre del Genero
 */

/**
 * @swagger
 * /api/genero:
 *  post:
 *    summary: Crea un genero para las peliculas
 *    tags: [Genero]
 *    components:
 *      securityShemes:
 *        bearerAuth:
 *          type: http
 *          sheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Genero'
 *    responses:
 *     200:
 *       description: Genero creado
 *     400:
 *      description: Error al crear el genero
 */
router.post("/genero", tokenMiddleware, genero.create);

/**
 * @swagger
 * /api/genero:
 *  get:
 *    summary: Consulta todos los generos de la base de datos
 *    tags: [Genero]
 *    responses:
 *     200:
 *       description: Lista de generos
 *       content: 
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Characters'
 */
router.get("/genero", tokenMiddleware, genero.getAll);

/**
 * @swagger
 * /api/genero/{id}:
 *  delete:
 *    summary: Borra los personajes de la base de datos
 *    tags: [Genero]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *         type: string
 *        required: true
 *        description: Id del genero
 *    responses:
 *     200:
 *       description:   Genero borrado
 *     404:
 *       description: Genero no encontrado
 */
router.delete("/genero/:id", tokenMiddleware, genero.delete);

/**
 * @swagger
 * /api/genero/{id}:
 *  put:
 *    summary: Actualiza el genero en la base de datos
 *    tags: [Genero]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *         type: string
 *        required: true
 *        description: Id del genero
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Genero'
 *    responses:
 *     200:
 *       description:  Genero actualizado
 *     404:
 *       description:  Genero no encontrado
 */
router.put("/genero/:id", tokenMiddleware, genero.update);

module.exports = router;
