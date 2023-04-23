const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { booking_rtt_id } = req.body;
//   console.log(booking_rtt_id);
  db.query(`DELETE FROM tb_booking_room_tutor WHERE booking_rtt_id = ${booking_rtt_id};`, (err, result) => {
    if (!err) {
      let data = {
        status: true,
        meg: "ลบสำเร็จ",
      };
      // console.log(result);
      res.json(data);
    } else {
      console.error(err);
    }
  });
});

module.exports = route;
