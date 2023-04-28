const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var multer = require("multer");
const db = require("./db/db.config");

const ts = Date.now();
const date_ob = new Date(ts);
// const dateNow = dateFormat(new Date(), "YYYY-MM-DD hh:mm:ss");
const verifyJWT = require("./fun/verifyToken");
const path = require("path");
const socket_io = require("socket.io");

const io = socket_io();

dotenv.config();

const {
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
  mobile_user_getFaculty_routes,
  mobile_user_getDepartment_routes,
  mobile_user_register_routes,
  mobile_user_editUserData_routes,
  mobile_driver_login_routes,
  mobile_driver_updateSocketId_routes,
  mobile_driver_updateLocation_routes,
  mobile_driver_getDataListCheckPoint_routes,
  mobile_driver_carEmgcy_routes,
  mobile_driver_getDataListUrgent_routes,
  mobile_driver_cancelUrgent_routes,
  mobile_driver_confirmUrgent_routes,
} = require("./routes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //Parse URL-encoded bodies
// app.use(express.static("uploads"));
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(__dirname));

app.use(
  cors({
    // origin: "http://localhost:8888",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/auth", verifyJWT, (req, res) => {
  res.json({ auth: true, meg: "auth work" });
});

app.get("/", (req, res) =>
  res.json({ message: "Powered By KMUTNB Smart Service" })
);
// web
app.use("/web/login", web_admin_login_routes);

//mobile user
app.use("/mobile/user/login", mobile_user_login_routes);
app.use(
  "/mobile/user/getCheckPoint",
  verifyJWT,
  mobile_user_getCheckPoint_routes
);
app.use(
  "/mobile/user/getCheckPointRoom",
  verifyJWT,
  mobile_user_getCheckPointRoom_routes
);
app.use(
  "/mobile/user/addDataGetCar",
  verifyJWT,
  mobile_user_addDataGetCar_routes
);
app.use(
  "/mobile/user/getLocationCar",
  verifyJWT,
  mobile_user_getLocationCar_routes
);
app.use(
  "/mobile/user/cancelGetCar",
  verifyJWT,
  mobile_user_cancelGetCar_routes
);
app.use(
  "/mobile/user/checkOldOrderUser",
  verifyJWT,
  mobile_user_checkOldOrderUser_routes
);
app.use(
  "/mobile/user/updateStatusGetCar",
  verifyJWT,
  mobile_user_updateStatusGetCar_routes
);
app.use(
  "/mobile/user/updateSocketId",
  verifyJWT,
  mobile_user_updateSocketId_routes
);
app.use("/mobile/user/searchRoom", verifyJWT, mobile_user_searchRoom_routes);
app.use("/mobile/user/getImgRoom", verifyJWT, mobile_user_getImgRoom_routes);
app.use("/mobile/user/bookingRoom", verifyJWT, mobile_user_bookingRoom_routes);
app.use(
  "/mobile/user/getDataBookingList",
  verifyJWT,
  mobile_user_dataBookingList_routes
);
app.use(
  "/mobile/user/updateStatusBookingRoom",
  verifyJWT,
  mobile_user_updateStatusBookingRoom_routes
);
app.use(
  "/mobile/user/cancelBookingRoom",
  verifyJWT,
  mobile_user_cencelBookingRoom_routes
);
app.use("/mobile/user/getDataEq", verifyJWT, mobile_user_getDataEq_routes);
app.use("/mobile/user/borrowEq", verifyJWT, mobile_user_borrowEq_routes);
app.use(
  "/mobile/user/getDataActivity",
  verifyJWT,
  mobile_user_getDataActivity_routes
);
app.use(
  "/mobile/user/joinActivity",
  verifyJWT,
  mobile_user_joinActivity_routes
);
app.use(
  "/mobile/user/getMyActivity",
  verifyJWT,
  mobile_user_getMyActivity_routes
);
app.use(
  "/mobile/user/reportActivity",
  verifyJWT,
  mobile_user_reportActivity_routes
);
app.use("/mobile/user/getHistory", verifyJWT, mobile_user_getHistory_routes);
app.use(
  "/mobile/user/getHsitoryCar",
  verifyJWT,
  mobile_user_getHistoryCar_routes
);
app.use("/mobile/user/getUserData", verifyJWT, mobile_user_getUserData_routes);
app.use(
  "/mobile/user/getBorrowList",
  verifyJWT,
  mobile_user_getBorrowList_routes
);
app.use(
  "/mobile/user/updateBorrow",
  verifyJWT,
  mobile_user_updateBorrow_routes
);
app.use("/mobile/user/getNoti/", verifyJWT, mobile_user_getNoti_routes);
app.use("/mobile/user/getFaculty", mobile_user_getFaculty_routes);
app.use("/mobile/user/getDepartment", mobile_user_getDepartment_routes);
app.use("/mobile/user/register", mobile_user_register_routes);
app.use("/mobile/user/editUserdata", verifyJWT, mobile_user_editUserData_routes);

// mobile Driver
app.use("/mobile/driver/login", mobile_driver_login_routes);
app.use(
  "/mobile/driver/updateSocketId",
  // verifyJWT,
  mobile_driver_updateSocketId_routes
);
app.use(
  "/mobile/driver/updateLocation",
  // verifyJWT,
  mobile_driver_updateLocation_routes
);
app.use(
  "/mobile/driver/getDataListCheckPoint",
  // verifyJWT,
  mobile_driver_getDataListCheckPoint_routes
);
app.use("/mobile/driver/carEmgcy", verifyJWT, mobile_driver_carEmgcy_routes);
app.use("/mobile/driver/getDataListUrgent", verifyJWT, mobile_driver_getDataListUrgent_routes);
app.use("/mobile/driver/cancelUrgent", verifyJWT, mobile_driver_cancelUrgent_routes);
app.use("/mobile/driver/confirmUrgent", verifyJWT, mobile_driver_confirmUrgent_routes);

// web 
app.use(
  "/web/user/getLocationCar",
  // verifyJWT,
  mobile_user_getLocationCar_routes
);

io.listen(
  app.listen(3001, () => {
    console.log(`Application is running on port 3001`);
  })
);

app.io = io.on("connection", (socket) => {
  console.log("Socket connected: " + socket.id);
  socket.on("disconnect", () => {
    socket.disconnect();
    db.query(
      `SELECT driver_id FROM tb_driver WHERE driver_socket_id = '${socket.id}'`,
      (err, result_check_driver) => {
        if (!err) {
          result_check_driver.length > 0 &&
            db.query(
              `UPDATE tb_driver SET driver_socket_id = NULL WHERE driver_socket_id = '${socket.id}'`,
              (err, result) => {
                err && console.error(err);
              }
            );
        }
      }
    );
    db.query(
      `SELECT std_id FROM tb_student WHERE std_socket_id = '${socket.id}'`,
      (err, result_check_user) => {
        if (!err) {
          result_check_user.length > 0 &&
            db.query(
              `UPDATE tb_student SET std_socket_id = NULL WHERE std_socket_id = '${socket.id}'`,
              (err, result) => {
                err && console.error(err);
              }
            );
        }
      }
    );

    console.log(`🔥: ${socket.id} user disconnected`);
  });
  // socket.on("addDataGetCar", () => {
  //   socket.emit("update_list_checkPoint");
  //   console.log("addDataGetCar!!!!");
  // });
});
