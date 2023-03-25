const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
// const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  //   const { driver_id, latitude, longitude } = req.body;
  db.query(
    `SELECT cpd_id, cpd_name, cpd_lat, cpd_long FROM tb_checkpoint_drive`,
    (err, result) => {
      if (!err) {
        let data = [];
        result.map((el, idx) => {
          db.query(
            `SELECT COUNT(get_car_id) AS amount_departure FROM tb_get_car WHERE departure = ${el.cpd_id} AND get_car_status = 1`,
            (err, result_departure) => {
              if (!err) {
                db.query(
                  `SELECT COUNT(get_car_id) AS amount_destination FROM tb_get_car WHERE destination = ${el.cpd_id} AND get_car_status = 2`,
                  (err, result_destination) => {
                    if (!err) {
                      data.push({
                        cpd_id: el.cpd_id,
                        cpd_name: el.cpd_name,
                        cpd_lat: el.cpd_lat,
                        cpd_long: el.cpd_long,
                        amount: {
                          upPoint: result_departure[0].amount_departure,
                          downPoint: result_destination[0].amount_destination,
                        },
                      });
                      if (idx == result.length - 1) {
                        res.json({ status: true, result: data });
                      }
                    } else {
                      console.error(err);
                    }
                  }
                );
              } else {
                console.error(err);
              }
            }
          );
        });
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
