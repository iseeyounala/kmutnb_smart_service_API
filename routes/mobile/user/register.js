const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const {
    std_number_id,
    std_fname,
    std_lname,
    username,
    password,
    valFaculty,
    valDepartment,
    valGender,
  } = req.body;
  db.query(
    `INSERT INTO tb_student(std_number_id, std_gender, std_fname, std_lname, std_username, std_password, dpm_id, fct_id) VALUES (
                                   '${std_number_id}', '${valGender}', '${std_fname}', '${std_lname}', '${username}', '${password}', '${valDepartment}', '${valFaculty}')`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          meg: "สมัครสำเร็จ",
        };
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
