//web
const web_login_routes = require("./web/login");


//mobile
const mobile_user_login_routes = require("./mobile/user/login");
const mobile_user_getCheckPoint_routes = require("./mobile/user/getCheckPoint");
const mobile_user_getCheckPointRoom_routes = require("./mobile/user/getCheckPointRoom");
const mobile_user_addDataGetCar_routes = require("./mobile/user/addDataGetCar");
const mobile_user_getLocationCar_routes = require("./mobile/user/getLocationCar");
const mobile_user_cancelGetCar_routes = require("./mobile/user/cancelGetCar");
const mobile_user_checkOldOrderUser_routes = require("./mobile/user/checkOldOrderUser");
const mobile_user_updateStatusGetCar_routes = require("./mobile/user/updateStatusGetCar");
const mobile_user_updateSocketId_routes = require("./mobile/user/updateSocketId");


//mobile Driver
const mobile_driver_login_routes = require("./mobile/driver/login");
const mobile_driver_updateSocketId_routes = require("./mobile/driver/updateSocketId");
const mobile_driver_updateLocation_routes = require("./mobile/driver/updateLocation");
const mobile_driver_getDataListCheckPoint_routes = require("./mobile/driver//getDataListCheckPoint");
const mobile_driver_carEmgcy_routes = require("./mobile/driver/carEmgcy");



module.exports = {
  web_login_routes,
  mobile_user_login_routes,
  mobile_user_getCheckPoint_routes,
  mobile_user_getCheckPointRoom_routes,
  mobile_user_addDataGetCar_routes,
  mobile_user_getLocationCar_routes,
  mobile_user_cancelGetCar_routes,
  mobile_user_checkOldOrderUser_routes,
  mobile_user_updateStatusGetCar_routes,
  mobile_user_updateSocketId_routes,
  mobile_driver_login_routes,
  mobile_driver_updateSocketId_routes,
  mobile_driver_updateLocation_routes,
  mobile_driver_getDataListCheckPoint_routes,
  mobile_driver_carEmgcy_routes,
};
