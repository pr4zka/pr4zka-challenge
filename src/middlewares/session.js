const { veryfyToken } = require("../helpers/handleJwt");
const users = require("../models/users");
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ msg: "No token provided" });
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await veryfyToken(token);
    if (!dataToken.id) {
      return res.status(401).send({ msg: "Invalid token" });
    }
    const user = await users.findByPk(dataToken.id);
    req.user = user;
    next();
  } catch (error) {
    res.send("No tiene los permisos para acceder a esta ruta");
  }
};

module.exports = authMiddleware;
