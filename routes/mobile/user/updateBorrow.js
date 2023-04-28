const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { eq_br_id, eq_br_status } = req.body;

  if (eq_br_status == 0) {
    db.query(
      `UPDATE tb_borrow_equipment SET eq_br_status = 1 WHERE eq_br_id = ${eq_br_id}`,
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
  } else if (eq_br_status == 1) {
    db.query(
      `SELECT * FROM tb_borrow_list WHERE eq_br_id = '${eq_br_id}'`,
      (err, result) => {
        err && console.error(err);
        result.map((val, idx) => {
          db.query(
            `SELECT * FROM tb_sports_equipment WHERE eq_id = '${val.eq_id}'`,
            (err_old, result_old) => {
              err_old && console.error(err_old);
              let amount_new =
                result_old[0].eq_sport_amount + val.borrow_list_amount;
              db.query(
                `UPDATE tb_sports_equipment SET eq_sport_amount = '${amount_new}' WHERE eq_id = '${val.eq_id}'`,
                (err_update, result_update) => {
                  err_update && console.error(err_update);
                  if (result.length - 1 == idx) {
                    db.query(
                      `UPDATE tb_borrow_equipment SET eq_br_status = 2, eq_br_give_back_at = NOW() WHERE eq_br_id = ${eq_br_id}`,
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
                  }
                }
              );
            }
          );
        });
      }
    );
  }
});

module.exports = route;
