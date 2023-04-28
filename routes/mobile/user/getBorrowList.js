const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id } = req.body;
  console.log(std_id);
  const result_data = [];
  db.query(
    `SELECT * FROM tb_borrow_equipment WHERE std_id = ${std_id} AND eq_br_status = 0 OR eq_br_status = 1`,
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
          result.map((val, idx) => {
            db.query(
              `SELECT * FROM tb_borrow_list AS a LEFT JOIN tb_sports_equipment AS b ON a.eq_id = b.eq_id WHERE a.eq_br_id = ${val.eq_br_id}`,
              (err, result_list) => {
                if (!err) {
                  let data = {
                    eq_br_id: val.eq_br_id,
                    eq_br_created_at: val.eq_br_created_at,
                    eq_br_status: val.eq_br_status,
                    list: result_list,
                  };
                  result_data.push(data);
                  if (idx == result.length - 1) {
                    res.json({ status: true, result: result_data });
                  }
                } else {
                  console.error(err);
                }
              }
            );
          });
        }
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
