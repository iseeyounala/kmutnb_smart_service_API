const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { booking_status, booking_rtt_id } = req.body;
  //   console.log(booking_rtt_id, booking_status);
  if (booking_status == 0) {
    db.query(
      `UPDATE tb_booking_room_tutor SET booking_status = 1 WHERE booking_rtt_id = ${booking_rtt_id}`,
      (err, result) => {
        if (!err) {
          let data = {
            status: true,
            meg: "Check In สำเร็จ",
          };
          // console.log(result);
          res.json(data);
        } else {
          console.error(err);
        }
      }
    );
  }else if (booking_status == 1){
    db.query(
        `UPDATE tb_booking_room_tutor SET booking_status = 2 WHERE booking_rtt_id = ${booking_rtt_id}`,
        (err, result) => {
          if (!err) {
            let data = {
              status: true,
              meg: "Check Out สำเร็จ",
            };
            // console.log(result);
            res.json(data);
          } else {
            console.error(err);
          }
        }
      );
  }
});

module.exports = route;
