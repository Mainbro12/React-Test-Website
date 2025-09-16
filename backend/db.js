import pgPromise from "pg-promise";
const pgp = pgPromise({});

const db = pgp("postgres://postgres:11223344@localhost:5432/test");

db.connect()
  .then(function (obj) {
    console.log("Successfully connection to DataBase");
    obj.done(); // success, release connection;
  })
  .catch(function (error) {
    console.log("ERROR:", error.message);
  });

export default db;
