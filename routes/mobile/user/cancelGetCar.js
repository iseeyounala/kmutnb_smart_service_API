const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
    const { get_car_id } = req.body;
    const io = req.app.io;
  db.query(
    `DELETE FROM tb_get_car WHERE get_car_id = ${get_car_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          meg: 'ยกเลิกสำเร็จ',
        };
        io.emit("update_list_checkPoint");
        // console.log(result);
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
