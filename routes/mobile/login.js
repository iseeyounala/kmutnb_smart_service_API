const express = require("express");
const route = express.Router();
const db = require("../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    let data = {
      auth: false,
      meg: "กรอก Username หรือ Password ให้ครบถ้วน",
    };

    res.json(data);
  } else {
    db.query(
      `select a.s_id,
              b.info_s_gender, 
              b.info_s_fname, 
              b.info_s_lname from saler as a left join info_saler as b on a.s_id = b.s_id where a.s_username = '${username}' and a.s_password = '${password}'`,
      (err, result) => {
        err ? console.log(err) : null;
        if (result.length == 1) {
          const s_id = result[0].s_id;
          db.query(
            `update saler set s_last_login = NOW() where s_id = '${s_id}'`,
            (error, resultUpdate) => {
              error ? console.log(error) : null;
              if (resultUpdate) {
                const token = jwt.sign({ s_id }, "jwtSecret", {
                  expiresIn: "24h", // time token
                });
                let data = {
                  auth: true,
                  result: result,
                  token: token,
                };
                res.json(data);
              } else {
                console.log(error);
              }
            }
          );
        } else {
          res.json({
            auth: false,
            meg: "ไม่พบข้อมูล",
          });
        }
      }
    );
  }
});

module.exports = route;
