const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id } = req.body;
  db.query(
    `SELECT a.booking_rtt_id,
                   a.booking_date,
                   a.booking_start_time,
                   a.booking_end_time,
                   b.rtt_id,
                   b.rtt_name,
                   a.booking_status FROM tb_booking_room_tutor AS a LEFT JOIN tb_room_tutor AS b ON a.rtt_id = b.rtt_id WHERE a.std_id = ${std_id} AND a.booking_status = 0 OR a.booking_status = 1`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          result: result,
        };
        // console.log(result);
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
