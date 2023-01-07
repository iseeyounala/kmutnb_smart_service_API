const express = require("express");
const route = express.Router();
const db = require("../../db/db.config");
const dateFormat = require("dateformat");
const jwt = require("jsonwebtoken");

const dateNow = dateFormat(new Date(), "YYYY-MM-DD hh:mm:ss");

route.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    var data = {
      auth: false,
      meg: "กรุณากรอก Username หรือ Password ให้ครบถ้วน",
    };
    res.json(data);
  } else {
    db.query(
      `SELECT a_id,a_gender,a_fname,a_lname,a_username,a_password FROM admin WHERE a_username = '${username}' AND a_password = '${password}'`,
      (err, result) => {
        
        err ? console.log(err) : null;
        if (result.length == 1) {
          console.log(result.length);
          const a_id = result[0].a_id;
          db.query(
            `update admin set a_last_login = NOW() where a_id = '${a_id}'`,
            (error, resultUpdate) => {
              error ? console.log(error) : null;
              if (resultUpdate) {
                const token = jwt.sign({ a_id }, "jwtSecret", {
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
