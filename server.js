const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var multer = require("multer");

const ts = Date.now();
const date_ob = new Date(ts);
// const dateNow = dateFormat(new Date(), "YYYY-MM-DD hh:mm:ss");
const verifyJWT = require("./fun/verifyToken");
const path = require("path");

dotenv.config();

const {
  web_login_routes,
  mobile_login_routes,
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
  res.json({auth: true, meg: "auth work" });
});

app.get("/", (req, res) => res.json({ message: "Powered By KMUTNB Smart Service" }));

// web
app.use("/web/login", web_login_routes);

//mobile
app.use("/mobile/login", mobile_login_routes);


app.listen(3001, () => {
  console.log(`Application is running on port 3001`);
});
