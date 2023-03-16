//web
const web_login_routes = require("./web/login");


//mobile
const mobile_user_login_routes = require("./mobile/user/login");
const mobile_user_getCheckPoint_routes = require("./mobile/user/getCheckPoint");
const mobile_user_getCheckPointRoom_routes = require("./mobile/user/getCheckPointRoom");
const mobile_user_addDataGetCar_routes = require("./mobile/user/addDataGetCar");
//mobile Driver
const mobile_driver_login_routes = require("./mobile/driver/login");
const mobile_driver_updateSocketId_routes = require("./mobile/driver/updateSocketId");
const mobile_driver_updateLocation_routes = require("./mobile/driver/updateLocation");



module.exports = {
  web_login_routes,
  mobile_user_login_routes,
  mobile_user_getCheckPoint_routes,
  mobile_user_getCheckPointRoom_routes,
  mobile_user_addDataGetCar_routes,
  mobile_driver_login_routes,
  mobile_driver_updateSocketId_routes,
  mobile_driver_updateLocation_routes,
};
