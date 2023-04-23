const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");


route.post("/", (req, res) => {
    const { base64, detail, ev_join_id } = req.body;
    db.query(
      `INSERT INTO tb_report_event(ev_join_id, rp_event_img, rp_event_detail) VALUES ('${ev_join_id}', '${base64}', '${detail}')`,
      (err, result) => {
        if (!err) {
          let data = {
            status: true,
            meg: 'สำเร็จ',
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
