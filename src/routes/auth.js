const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controllers");
const { postLogin, postRegister } = require("../validators/auth");


/**
 * @swagger
 * components:
 *  schemas:
 *   Auth:
 *    type: object
 *    properties:
 *     email: 
 *      type: string
 *      description: Email del usuario
 *     password:
 *      type: string
 *      description: Contraseña del usuario
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Inicia sesión en el sistema y recibe un token de autenticación
 *    tags: [Auth]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Auth'
 *    responses:
 *     200:
 *       description: Token de autenticación
 *     400:
 *      description: Error al iniciar sesión
 */
router.post("/login", postLogin ,auth.login);

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Crea un nuevo usuario y recibe un email de bienvenida
 *    tags: [Auth]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Auth'
 *    responses:
 *     200:
 *       description: Usuario creado
 *     400:
 *      description: Error al crear el Usuario
 */
router.post("/resgister", postRegister ,auth.register);




module.exports = router;
