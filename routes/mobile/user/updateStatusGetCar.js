const express = require("express");
const route = express.Router();
const db = require("../../../db/db.config");
const jwt = require("jsonwebtoken");
const dateFormat = require("dateformat");
const io = require("../../../fun/socket");

const dateNow = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

route.post("/", (req, res) => {
  const { car_id, std_id } = req.body;
  if (!car_id) {
    let data = {
      status: false,
      meg: "QrCode ไม่ถูกต้อง",
    };
    res.json(data);
  } else {
    db.query(
      `SELECT driver_id FROM tb_driver WHERE car_id = ${car_id}`,
      (err, result) => {
        if (!err) {
          let driver_id = result[0].driver_id;
          db.query(
            `SELECT get_car_status, get_car_id FROM tb_get_car WHERE std_id = ${std_id} AND get_car_status = 1 OR get_car_status = 2`,
            (err, result_old) => {
              if (!err) {
                let get_car_status = result_old[0].get_car_status;
                let get_car_id = result_old[0].get_car_id;
                if (get_car_status == 1) {
                  db.query(
                    `UPDATE tb_get_car SET get_car_status = 2, driver_id = ${driver_id} WHERE get_car_id = ${get_car_id}`,
                    (err, result_update) => {
                      if (!err) {
                        let data = {
                          status: true,
                          meg: "สำเร็จ",
                          success: false
                        };
                        res.json(data);
                      } else {
                        console.error(err);
                      }
                    }
                  );
                } else if (get_car_status == 2) {
                  db.query(
                    `UPDATE tb_get_car SET get_car_status = 3, driver_id = ${driver_id} WHERE get_car_id = ${get_car_id}`,
                    (err, result_update) => {
                      if (!err) {
                        let data = {
                          status: true,
                          meg: "สำเร็จ",
                          success: true,
                        };
                        res.json(data);
                      } else {
                        console.error(err);
                      }
                    }
                  );
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
  }
});

module.exports = route;
