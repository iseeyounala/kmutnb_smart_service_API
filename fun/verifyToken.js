const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json({ auth: false, meg: "we need a token" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, meg: "you failed Authentication" });
      } else {
        req.std_id = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
