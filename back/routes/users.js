// routes/users.js
const express = require("express");
const connection = require("../conf");

const router = express.Router();

router.get("/", (req, res) => {
  const sqlQuery = "SELECT user.email, user.username FROM user";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Error getting users" });
      return;
    }
    res.status(200).json(results);
  });
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const sqlQuery =
    "SELECT user.email, user.username FROM user WHERE user.id = ?";
  connection.query(sqlQuery, userId, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error getting user" });
      return;
    }
    res.status(200).json(result);
  });
});
module.exports = router;
