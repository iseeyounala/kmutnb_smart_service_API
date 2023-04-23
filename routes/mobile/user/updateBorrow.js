const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { eq_br_id } = req.body;
  db.query(
    `UPDATE tb_borrow_equipment SET eq_br_status = 1, eq_br_give_back_at = NOW() WHERE eq_br_id = ${eq_br_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          meg: "สำเร็จ",
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
