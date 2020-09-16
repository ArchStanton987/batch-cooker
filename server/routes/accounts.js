// routes/accounts.js
const express = require("express");
const accountsCtrl = require('../controllers/account.controllers')

const router = express.Router();

router.post("/register", (req, res) => {
  // const sqlQuery = "SELECT user.email, user.username FROM user";
  // connection.query(sqlQuery, (err, results) => {
  //   if (err) {
  //     res.status(500).send({ message: "Error getting users" });
  //     return;
  //   }
  //   res.status(200).json(results);
  // });

  accountsCtrl.register(req)

});

router.get("/login", (req, res) => {
  // const userId = req.params.userId;
  // const sqlQuery =
  //   "SELECT user.email, user.username FROM user WHERE user.id = ?";
  // connection.query(sqlQuery, userId, (err, result) => {
  //   if (err) {
  //     res.status(500).send({ message: "Error getting user" });
  //     return;
  //   }
  //   res.status(200).json(result);
  // });
});
module.exports = router;
