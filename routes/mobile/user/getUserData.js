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
    `SELECT * FROM tb_student AS a LEFT JOIN tb_department AS b ON a.dpm_id = b.dpm_id
                                   LEFT JOIN tb_faculty AS c ON a.fct_id = c.fct_id WHERE std_id = ${std_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          result: result[0],
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
