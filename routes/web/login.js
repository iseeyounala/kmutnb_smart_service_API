const express = require("express");
const route = express.Router();
const db = require("../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    db.query(
      `SELECT admin_id, admin_username, admin_password, admin_level FROM tb_admin WHERE admin_username = '${username}' AND admin_password = '${password}'`,
      (err, result) => {
        if (!err) {
          if (result.length == 1 && result) {
            let admin_id = result[0].admin_id;
            db.query(
              `UPDATE tb_admin SET admin_last_login = NOW() WHERE admin_id = '${admin_id}'`,
              (err, result_updated) => {
                if (!err) {
                  if (result_updated) {
                    const token = jwt.sign({ admin_id }, "jwtSecret", {
                      expiresIn: "24h", // time token
                    });
                    // if (result[0].admin_level == 0) {
                    //   let data = {
                    //     status: true,
                    //     meg: "เข้าสู่ระบบสำเร็จ",
                    //     token: token,
                    //     admin_id: result[0].admin_id,
                    //     role: [0, 1, 2],
                    //   };
                    //   res.json(data);
                    // }
                    let data = {
                      status: true,
                      meg: "เข้าสู่ระบบสำเร็จ",
                      token: token,
                      admin_id: result[0].admin_id,
                      role: [5150, 2001, 1984],
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
