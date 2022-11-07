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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

//para leer la documentacion de la API
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

//config
const port = process.env.PORT || 3000;

//routes
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.all("*", (req, res) => {
  res.render('/api-docs');
});
app.use("/api/", require("./routes/personajes"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/", require("./routes/peliculas"));
app.use("/api/", require("./routes/genero"));

//server
app.listen(port, () => {
  sequelize.sync({ force: false }).then(() => {
    console.log(`Server running on port ${port}`);
  });
});

dbConnectMysql();
