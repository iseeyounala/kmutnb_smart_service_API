const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    db.query(
      `SELECT driver_id, driver_fname, driver_lname FROM tb_driver WHERE driver_username = '${username}' AND driver_password = '${password}'`,
      (err, result) => {
        if (!err) {
          if (result.length == 1 && result) {
            let driver_id = result[0].driver_id;
            let driver_fname = result[0].driver_fname;
            db.query(
              `UPDATE tb_driver SET driver_last_login = NOW() WHERE driver_id = '${driver_id}'`,
              (err, result_updated) => {
                if (!err) {
                  if (result_updated) {
                    const token = jwt.sign(
                      { driver_id, driver_fname },
                      "jwtSecret",
                      {
                        expiresIn: "24h", // time token
                      }
                    );
                    let data = {
                      status: true,
                      meg: "เข้าสู่ระบบสำเร็จ",
                      token: token,
                    };
                    res.json(data);
                  } else {
                    console.error(err);
                  }
                } else {
                  console.error(err);
                }
              }
            );
          } else {
            let data = {
              status: false,
              meg: "ไม่พบข้อมูล",
            };
            res.json(data);
          }
        } else {
          console.error(err);
        }
      }
    );
  }
  console.log(username, password);
});

module.exports = route;
