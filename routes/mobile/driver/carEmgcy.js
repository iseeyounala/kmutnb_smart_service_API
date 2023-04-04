const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { get_car_emgcy_detail } = req.body;
  const io = req.app.io;
  if (get_car_emgcy_detail.length > 0) {
    db.query(
      `SELECT get_car_id FROM tb_get_car WHERE get_car_status = 1 OR get_car_status = 2`,
      (err, result) => {
        if (!err) {
          if (result.length > 0) {
            result.map((el, idx) => {
              db.query(
                `UPDATE tb_get_car SET get_car_status = 0, get_car_emgcy_detail = '${get_car_emgcy_detail}' WHERE get_car_id = ${el.get_car_id}`,
                (err, result_update) => {
                  if (!err) {
                    if (idx == result.length - 1) {
                      io.emit("get_car_emgcy", get_car_emgcy_detail);
                      res.json({ status: true, meg: "สำเร็จ" });
                    }
                  } else {
                    console.error(err);
                  }
                }
              );
            });
          } else {
            let data = {
              status: true,
              meg: "สำเร็จ",
            };
            res.json(data);
          }
        } else {
          console.error(err);
        }
      }
    );
  }
});

module.exports = route;
