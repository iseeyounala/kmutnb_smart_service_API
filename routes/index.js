//web
const web_login_routes = require("./web/login");


//mobile
const mobile_user_login_routes = require("./mobile/user/login");

//mobile Driver
const mobile_driver_login_routes = require("./mobile/driver/login");



module.exports = {
  web_login_routes,
  mobile_user_login_routes,
  mobile_driver_login_routes,
};
