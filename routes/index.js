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
const mobile_user_searchRoom_routes = require("./mobile/user/searchRoom");
const mobile_user_getImgRoom_routes = require("./mobile/user/getImgRoom");
const mobile_user_bookingRoom_routes = require("./mobile/user/bookingRoom");
const mobile_user_dataBookingList_routes = require("./mobile/user/getDataBookingList");
const mobile_user_updateStatusBookingRoom_routes = require("./mobile/user/updateStatusBookingRoom");
const mobile_user_cencelBookingRoom_routes = require("./mobile/user/cancelBookingRoom");
const mobile_user_getDataEq_routes = require("./mobile/user/getDataEq");
const mobile_user_borrowEq_routes = require("./mobile/user/borrowEq");
const mobile_user_getDataActivity_routes = require("./mobile/user/getDataActivity");
const mobile_user_joinActivity_routes = require("./mobile/user/joinActivity");
const mobile_user_getMyActivity_routes = require("./mobile/user/getMyActivity");
const mobile_user_reportActivity_routes = require("./mobile/user/reportActivity");
const mobile_user_getHistory_routes = require("./mobile/user/getHistory");
const mobile_user_getHistoryCar_routes = require("./mobile/user/getHistoryCar");
const mobile_user_getUserData_routes = require("./mobile/user/getUserData");
const mobile_user_getBorrowList_routes = require("./mobile/user/getBorrowList");
const mobile_user_updateBorrow_routes = require("./mobile/user/updateBorrow");
const mobile_user_getNoti_routes = require("./mobile/user/getNoti");

//mobile Driver
const mobile_driver_login_routes = require("./mobile/driver/login");
const mobile_driver_updateSocketId_routes = require("./mobile/driver/updateSocketId");
const mobile_driver_updateLocation_routes = require("./mobile/driver/updateLocation");
const mobile_driver_getDataListCheckPoint_routes = require("./mobile/driver//getDataListCheckPoint");
const mobile_driver_carEmgcy_routes = require("./mobile/driver/carEmgcy");

// web
const web_admin_login_routes = require("./web/login");
const { required } = require("nodemon/lib/config");

module.exports = {
  web_admin_login_routes,
  mobile_user_login_routes,
  mobile_user_getCheckPoint_routes,
  mobile_user_getCheckPointRoom_routes,
  mobile_user_addDataGetCar_routes,
  mobile_user_getLocationCar_routes,
  mobile_user_cancelGetCar_routes,
  mobile_user_checkOldOrderUser_routes,
  mobile_user_updateStatusGetCar_routes,
  mobile_user_updateSocketId_routes,
  mobile_user_searchRoom_routes,
  mobile_user_getImgRoom_routes,
  mobile_user_bookingRoom_routes,
  mobile_user_dataBookingList_routes,
  mobile_user_updateStatusBookingRoom_routes,
  mobile_user_cencelBookingRoom_routes,
  mobile_user_getDataEq_routes,
  mobile_user_borrowEq_routes,
  mobile_user_getDataActivity_routes,
  mobile_user_joinActivity_routes,
  mobile_user_getMyActivity_routes,
  mobile_user_reportActivity_routes,
  mobile_user_getHistory_routes,
  mobile_user_getHistoryCar_routes,
  mobile_user_getUserData_routes,
  mobile_user_getBorrowList_routes,
  mobile_user_updateBorrow_routes,
  mobile_user_getNoti_routes,
  mobile_driver_login_routes,
  mobile_driver_updateSocketId_routes,
  mobile_driver_updateLocation_routes,
  mobile_driver_getDataListCheckPoint_routes,
  mobile_driver_carEmgcy_routes,
};
