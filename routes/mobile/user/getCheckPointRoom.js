const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.get("/", (req, res) => {
  //   const { username, password } = req.body;
  db.query(`SELECT cpr_id, cpr_name, cpr_lat, cpr_long FROM tb_checkpoint_room ORDER BY cpr_id `,(err, result) => {
      if (!err) {
        let data = {
          status: true,
          result: result
        }
        // console.log(result);
        res.json(data);
      }else{
        console.error(err);
      }
  })
});

module.exports = route;
