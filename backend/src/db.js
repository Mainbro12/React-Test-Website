import pgPromise from "pg-promise";
import APP_CONFIG from "./config.js";

const pgp = pgPromise({});

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = APP_CONFIG;
const db = pgp(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

db.connect()
  .then(function (obj) {
    console.log("Successfully connection to DataBase");
    obj.done(); // success, release connection;
  })
  .catch(function (error) {
    console.log("ERROR:", error.message);
  });

export default db;
