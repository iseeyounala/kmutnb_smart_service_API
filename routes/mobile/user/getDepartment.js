const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  //   const { std_id } = req.body;
  const dataDepartment = [];
  db.query(
    `SELECT * FROM tb_department WHERE dpm_del_status = 0`,
    (err, result) => {
      if (!err) {
        if (result.length > 0) {
          result.map((val, idx) => {
            let obj = {
              label: val.dpm_name,
              value: val.dpm_id,
            };
            dataDepartment.push(obj);
            if (idx == result.length - 1) {
              let data = {
                status: true,
                result: dataDepartment,
              };
              res.json(data);
            }
          });
        } else {
          let data = {
            status: true,
            result: dataFaculty,
          };
          res.json(data);
        }
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
