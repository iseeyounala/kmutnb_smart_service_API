const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { data, std_id } = req.body;
  //   console.log(data);
  db.query(
    `INSERT INTO tb_borrow_equipment(std_id, eq_br_created_at) VALUES ('${std_id}', '${dateNow}')`,
    (err, result) => {
      if (!err) {
        let id = result.insertId;
        data.map((val, idx) => {
          val.eq_sport_amount = val.eq_sport_amount - val.eq_user_amount;
          db.query(
            `UPDATE tb_sports_equipment SET eq_sport_amount = ${val.eq_sport_amount} WHERE eq_id = ${val.eq_id}`,
            (err, result) => {
              if (!err) {
                db.query(
                  `INSERT INTO tb_borrow_list(eq_br_id, eq_id, borrow_list_amount) VALUES ('${id}', '${val.eq_id}', ${val.eq_user_amount})`,
                  (err, result) => {
                    if (!err) {
                      if (idx == data.length - 1) {
                        res.json({ status: true, meg: "ยืมสำเร็จ" });
                      }
                    } else {
                      console.error(err);
                    }
                  }
                );
              } else {
                console.error(err);
              }
            }
          );
        });
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
