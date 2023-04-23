const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id, rtt_id, booking_date, startTime, endTime } = req.body;
  // console.log(std_id, rtt_id, booking_date, startTime, endTime);
  const io = req.app.io;
  db.query(
    `INSERT INTO tb_booking_room_tutor(std_id, 
                                                rtt_id, 
                                                booking_date, 
                                                booking_start_time, 
                                                booking_end_time) VALUES (${std_id}, ${rtt_id}, '${dateFormat(
      booking_date,
      "yyyy-mm-dd"
    )}', '${dateFormat(startTime, "HH:MM:ss")}', '${dateFormat(
      endTime,
      "HH:MM:ss"
    )}')`,
    (err, result) => {
      if (!err) {
        io.emit("booking_room_new");
        let data = {
          status: true,
          meg: "จองสำเร็จ",
        };
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
