const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id, std_number_id, valGender, std_fname, std_lname, valFaculty, valDepartment } = req.body;
  db.query(
    `UPDATE tb_student SET std_number_id = '${std_number_id}',
                           std_gender = '${valGender}',
                           std_fname = '${std_fname}',
                           std_lname = '${std_lname}',
                           fct_id = '${valFaculty}',
                           dpm_id = '${valDepartment}' WHERE std_id = ${std_id}`,
    (err, result) => {
      if (!err) {
        let data = {
          status: true,
          meg: 'แก้ไขข้อมูลสำเร็จ',
        };
        // console.log(result);
        res.json(data);
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
