const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { dataActivity, std_id } = req.body;
  //   console.log(dataActivity);
  db.query(
    `SELECT ev_join_id FROM tb_event_join WHERE std_id = ${std_id} AND event_id = ${dataActivity.event_id}`,
    (err, result) => {
      if (!err) {
        if (result && result.length == 0) {
          db.query(
            `INSERT INTO tb_event_join(std_id, event_id) VALUES ('${std_id}', '${dataActivity.event_id}')`,
            (err, result) => {
              if (!err) {
                let data = {
                  status: true,
                  meg: "สำเร็จ",
                };
                res.json(data);
              } else {
                console.error(err);
              }
            }
          );
        } else {
          let data = {
            status: false,
            meg: "คุณเข้าร่วมกิจกรรมนี้แล้ว",
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
