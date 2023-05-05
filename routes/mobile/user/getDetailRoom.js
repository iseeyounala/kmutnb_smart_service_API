const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { rtt_id } = req.body;
  //   console.log(std_id);
  db.query(
    `SELECT * FROM tb_detail_room WHERE rtt_id = ${rtt_id}`,
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
