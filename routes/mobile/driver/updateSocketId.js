const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
// const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
    const { driver_id, socketId } = req.body;
  db.query(`UPDATE tb_driver SET driver_socket_id = '${socketId}' WHERE driver_id = ${driver_id}`,(err, result) => {
      if (!err) {
        let data = {
          status: true,
        //   result: result
        }
        // console.log(result);
        res.json(data);
      }else{
        console.error(err);
      }
  })
});

module.exports = route;
