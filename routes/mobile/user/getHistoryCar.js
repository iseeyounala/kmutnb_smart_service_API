const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id } = req.body;
  const dataCar = [];
  db.query(
    `SELECT a.get_car_id,
          a.std_id,
          a.departure AS departure_id,
          b.cpd_name AS departure_name,
          b.cpd_lat AS departure_lat,
          b.cpd_long AS departure_long,
          a.destination AS destination_id,
          a.get_car_status, a.get_car_created_at FROM tb_get_car as a LEFT JOIN tb_checkpoint_drive as b ON a.departure = b.cpd_id WHERE a.std_id = ${std_id}`,
    (err, result_departure) => {
      if (result_departure.length > 0) {
        result_departure.map((val, idx) => {
          db.query(
            `SELECT cpd_name, cpd_lat, cpd_long FROM tb_checkpoint_drive WHERE cpd_id = ${val.destination_id}`,
            (err, result_destination) => {
              let data = {
                // status: true,
                // meg: "สำเร็จ",
                get_car_id: val.get_car_id,
                get_car_status: val.get_car_status,
                departure_id: val.departure_id,
                departure_name: val.departure_name,
                get_car_created_at: val.get_car_created_at,
                departure_location: {
                  latitude: val.departure_lat,
                  longitude: val.departure_long,
                },
                destination_id: val.destination_id,
                destination_name: result_destination[0].cpd_name,
                destination_location: {
                  latitude: result_destination[0].cpd_lat,
                  longitude: result_destination[0].cpd_long,
                },
              };
              dataCar.push(data);
              if (idx == result_departure.length - 1) {
                res.json({ status: true, result: dataCar });
              }
            }
          );
        });
      } else {
        let data = {
          status: false,
          result: [],
        };
        res.json(data);
      }
    }
  );
});

module.exports = route;
