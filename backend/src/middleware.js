import jwt from "jsonwebtoken";
import APP_CONFIG from "./config.js";

const SECRET_KEY = APP_CONFIG.JWT_SECRET_KEY;

const withAuth = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token.split(" ")[1], SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

export default withAuth;
