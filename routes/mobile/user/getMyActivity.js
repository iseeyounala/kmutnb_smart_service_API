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
    `SELECT a.ev_join_id,
            b.event_id,
            b.event_img,
            b.event_name,
            b.event_detail FROM tb_event_join AS a LEFT JOIN tb_event AS b ON a.event_id = b.event_id WHERE a.std_id = ${std_id}`,
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
