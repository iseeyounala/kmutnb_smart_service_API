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
      a.std_id,
      b.std_number_id,
      b.std_gender,
      b.std_fname,
      b.std_lname,
      c.rtt_id,
      c.rtt_name,
      a.booking_date,
      a.booking_start_time,
      a.booking_end_time,
      a.booking_status FROM tb_booking_room_tutor AS a LEFT JOIN tb_student AS b ON a.std_id = b.std_id 
                                       LEFT JOIN tb_room_tutor AS c ON a.rtt_id = c.rtt_id WHERE a.std_id = ${std_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          result: result,
        };
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
