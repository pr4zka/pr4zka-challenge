const { Sequelize } = require("sequelize");

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT_DB;
const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
});

const dbConnectMysql = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.log("Unable to connect to the database:", err);
    });
};

module.exports = {
  sequelize,
  dbConnectMysql,
};
