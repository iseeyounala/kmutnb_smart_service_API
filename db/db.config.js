const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.MY_API_HOST,
  user: process.env.MY_API_USER,
  password: process.env.MY_API_PASSWORD,
  database: process.env.MY_API_DATABASE,
  port: process.env.MY_API_PORT,
  timezone: "GMT+7",
});

module.exports = db;
