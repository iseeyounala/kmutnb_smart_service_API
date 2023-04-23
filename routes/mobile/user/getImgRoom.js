const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { rtt_id } = req.body;
  //   console.log(rtt_id);
  db.query(
    `SELECT rtt_img_id, rtt_id, rtt_img_name FROM tb_img_room_tutor WHERE rtt_id = ${rtt_id}`,
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
            let data = {
                status: true,
                result: result
            }
            res.json(data);
        }else{
            res.json({status: true, result: []})
        }
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
