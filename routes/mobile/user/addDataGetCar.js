const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { std_id, userOrgin, destination } = req.body.dataPickUp;
  const {statusCar} = req.body;
  // const { std_id, origin, des } = req.body;
  const io = req.app.io;
  const statusUrgent = statusCar ? 1 : 0;
  // console.log(req.body.dataPickUp);
  db.query(
    `INSERT INTO tb_get_car(std_id, departure, destination, get_car_created_at, get_car_urgent_status) VALUES ('${std_id}', '${userOrgin.cpd_id}', '${destination.cpd_id}', NOW(), '${statusUrgent}')`,
    // `INSERT INTO tb_get_car(std_id, departure, destination, get_car_created_at) VALUES ('${std_id}', '${origin}', '${des}', '${dateNow}')`,
    (err, result) => {
      if (!err) {
        let id = result.insertId;
        db.query(
          `SELECT a.get_car_id,
          a.departure AS departure_id,
          b.cpd_name AS departure_name,
          b.cpd_lat AS departure_lat,
          b.cpd_long AS departure_long,
          a.destination AS destination_id,
          a.get_car_status,
          a.get_car_urgent_status FROM tb_get_car as a LEFT JOIN tb_checkpoint_drive as b ON a.departure = b.cpd_id WHERE a.get_car_id = ${id}`,
          (err, result_departure) => {
            db.query(
              `SELECT cpd_name, cpd_lat, cpd_long FROM tb_checkpoint_drive WHERE cpd_id = ${result_departure[0].destination_id}`,
              (err, result_destination) => {
                let data = {
                  status: true,
                  meg: "สำเร็จ",
                  get_car_id: result_departure[0].get_car_id,
                  get_car_status: result_departure[0].get_car_status,
                  get_car_urgent_status: result_departure[0].get_car_urgent_status,
                  departure_id: result_departure[0].departure_id,
                  departure_name: result_departure[0].departure_name,
                  departure_location: {
                    latitude: result_departure[0].departure_lat,
                    longitude: result_departure[0].departure_long,
                  },
                  destination_id: result_departure[0].destination_id,
                  destination_name: result_destination[0].cpd_name,
                  destination_location: {
                    latitude: result_destination[0].cpd_lat,
                    longitude: result_destination[0].cpd_long,
                  },
                };
                if (statusUrgent == 1) {
                  io.emit("update_list_urgent");
                }
                io.emit("update_list_checkPoint");
                res.json(data);
              }
            );
          }
        );
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = route;
