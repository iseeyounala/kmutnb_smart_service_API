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
  web_login_routes,
  mobile_user_login_routes,
  mobile_user_getCheckPoint_routes,
  mobile_user_getCheckPointRoom_routes,
  mobile_user_addDataGetCar_routes,
  mobile_driver_login_routes,
  mobile_driver_updateSocketId_routes,
  mobile_driver_updateLocation_routes,
} = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
// app.use(express.static("uploads"));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(__dirname));

app.use(
  cors({
    // origin: ["http://localhost:3001"],
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
app.use("/web/login", web_login_routes);

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

// mobile Driver
app.use("/mobile/driver/login", mobile_driver_login_routes);
app.use(
  "/mobile/driver/updateSocketId",
  verifyJWT,
  mobile_driver_updateSocketId_routes
);
app.use(
  "/mobile/driver/updateLocation",
  verifyJWT,
  mobile_driver_updateLocation_routes
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
      `UPDATE tb_driver SET driver_socket_id = NULL WHERE driver_socket_id = '${socket.id}'`,
      (err, result) => {
        err && console.error(err);
      }
    );
    console.log(`🔥: ${socket.id} user disconnected`);
  });
});
