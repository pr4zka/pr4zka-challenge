const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { dbConnectMysql, sequelize } = require("./database/db");
const app = express();
const cors = require("cors");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//swagger documentation
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Dinesy - Challenge Alkemy",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//para leer la documentacion de la API
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

//config
const port = process.env.PORT || 3000;

//routes
app.use("/api/", require("./routes/personajes"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/", require("./routes/peliculas"));
app.use("/api/", require("./routes/genero"));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

//server
app.listen(port, () => {
  sequelize.sync({ force: false }).then(() => {
    console.log(`Server running on port ${port}`);
  });
});

dbConnectMysql();
