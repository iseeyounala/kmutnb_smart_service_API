const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { date, startTime, endTime, cpr_id } = req.body;
  // console.log(dateFormat(date, "yyyy-mm-dd"), dateFormat(startTime, "HH:MM:ss"), dateFormat(endTime, "HH:MM:ss"));
  db.query(
    `SELECT rtt_id, rtt_name, rtt_join_amount FROM tb_room_tutor WHERE cpr_id = ${cpr_id}`,
    (err, result) => {
      let room = [];
      if (!err) {
        if (result.length > 0) {
          result.map((el, idx) => {
            db.query(
              `SELECT booking_rtt_id
              FROM tb_booking_room_tutor
              WHERE rtt_id = ${el.rtt_id}
                AND booking_date = '${dateFormat(date, "yyyy-mm-dd")}'
                AND ((booking_start_time <= '${dateFormat()}' AND booking_end_time > '${dateFormat(startTime,"HH:MM:ss")}') OR
                    (booking_start_time >= '${dateFormat(startTime,"HH:MM:ss")}' AND booking_start_time < '${dateFormat(endTime,"HH:MM:ss")}')) AND booking_status = 0 OR booking_status = 1;`,
              (err, resultCheck) => {
                if (!err) {
                  if (resultCheck.length == 0) {
                    room.push(el);
                  }
                  if (idx == result.length - 1) {
                    res.json({ status: true, result: room });
                  }
                } else {
                  console.error(err);
                }
              }
            );
          });
        } else {
          res.json({ status: true, result: [] });
        }
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
