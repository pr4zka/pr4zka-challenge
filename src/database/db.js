const { Sequelize } = require("sequelize");

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Mysql database is connected");
  } catch (error) {
    console.log("Mysql error de conexion", error);
  }
};

module.exports = {
  sequelize,
  dbConnectMysql,
};