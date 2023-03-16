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
      `SELECT std_id, std_username, std_password FROM tb_student WHERE std_username = '${username}' AND std_password = '${password}'`,
      (err, result) => {
        if (!err) {
          if (result.length == 1 && result) {
            let std_id = result[0].std_id;
            db.query(
              `UPDATE tb_student SET std_last_login = NOW() WHERE std_id = '${std_id}'`,
              (err, result_updated) => {
                if (!err) {
                  if (result_updated) {
                    const token = jwt.sign({ std_id }, "jwtSecret", {
                      expiresIn: "24h", // time token
                    });
                    let data = {
                      status: true,
                      meg: "เข้าสู่ระบบสำเร็จ",
                      token: token,
                      std_id: std_id
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
