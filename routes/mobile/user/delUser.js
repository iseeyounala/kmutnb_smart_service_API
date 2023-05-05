const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id } = req.body;
//   console.log(std_id);
  db.query(
    `DELETE FROM tb_student WHERE std_id = ${std_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          meg: 'ลบข้อมูลสำเร็จ',
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
