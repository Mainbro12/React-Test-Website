import jwt from "jsonwebtoken";
const SECRET_KEY = "asdassadas1312321321sad";

const withAuth = function (req, res, next) {
  const token = req.header("Authorization");
  console.log(token);

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
