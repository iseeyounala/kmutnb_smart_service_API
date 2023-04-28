const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  //   const { username, password } = req.body;
  const dataList = [];
  db.query(
    `SELECT a.get_car_id,
            a.std_id,
            a.departure AS departure_id,
            b.cpd_name AS departure_name,
            b.cpd_lat AS departure_lat,
            b.cpd_long AS departure_long,
            a.destination AS destination_id,
            a.get_car_status, 
            a.get_car_urgent_status,
            a.get_car_created_at FROM tb_get_car as a LEFT JOIN tb_checkpoint_drive as b ON a.departure = b.cpd_id 
                                    WHERE (a.get_car_urgent_status = 1 OR a.get_car_urgent_status = 2) AND a.get_car_status = 1 OR a.get_car_status = 2`,
    (err, result) => {
      if (!err) {
        result.map((val, idx) => {
          db.query(
            `SELECT cpd_name, cpd_lat, cpd_long FROM tb_checkpoint_drive WHERE cpd_id = ${val.destination_id}`,
            (err_, result_destination) => {
              let data = {
                get_car_id: val.get_car_id,
                get_car_status: val.get_car_status,
                get_car_urgent_status: val.get_car_urgent_status,
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
              dataList.push(data);
              if (result.length - 1 == idx) {
                res.json({ status: true, result: dataList });
              }
              err_ && console.error(err);
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
