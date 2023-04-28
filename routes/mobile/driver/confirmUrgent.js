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
  db.query(`UPDATE tb_get_car SET get_car_urgent_status = 2 WHERE get_car_id = ${get_car_id}`, (err, result) => {
    if (!err) {
      let data = {
        status: true,
        meg: "สำเร็จ",
      };
      // console.log(result);
      io.emit("update_urgent_status");
      res.json(data);
    } else {
      console.error(err);
    }
  });
});

module.exports = route;
