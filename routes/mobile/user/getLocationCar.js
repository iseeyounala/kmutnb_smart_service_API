const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  //   const { username, password } = req.body;
  db.query(`SELECT driver_id, driver_socket_id, driver_lat, driver_long FROM tb_driver WHERE driver_socket_id != 'NULL'  AND driver_del_status = 0`,(err, result) => {
      if (!err) {
        let data = {
          status: true,
          result: result
        }
        // console.log(result);
        res.json(data);
      }else{
        console.error(err);
      }
  })
});

module.exports = route;
