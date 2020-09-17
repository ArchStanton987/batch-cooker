// routes/users.js
const express = require('express')
const usersCtrl = require('../controllers/users.controllers')

const router = express.Router()

  // router.get('/', (req, res) => {
  // const sqlQuery = "SELECT user.email, user.username FROM user";
  // connection.query(sqlQuery, (err, results) => {
  //   if (err) {
  //     res.status(500).send({ message: "Error getting users" });
  //     return;
  //   }
  //   res.status(200).json(results);
  // });
  // })

router.route('/').get(usersCtrl.getAllUsers)
router.route('/').post(usersCtrl.createOneUser)
router.route('/:id').get(usersCtrl.getOneUser)
router.route('/:id').put(usersCtrl.updateOneUser)
router.route('/:id').delete(usersCtrl.deleteOneUser)

  // router.get('/:userId', (req, res) => {
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
  // })
module.exports = router
