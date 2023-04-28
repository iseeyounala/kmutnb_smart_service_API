const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { get_car_id, detail } = req.body;
  const io = req.app.io;
  db.query(
    `UPDATE tb_get_car SET get_car_urgent_detail = '${detail}',
                           get_car_urgent_status = 3,
                           get_car_status = 0 WHERE get_car_id = ${get_car_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          meg: "สำเร็จ",
        };
        // console.log(result);
        io.emit("cancelUrgent", detail);
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
