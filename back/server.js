require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./conf.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const users = require("./routes/users");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/users", users);

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${process.env.SERVER_PORT}`);
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const authData = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    req.authData = authData;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/api/login", (req, res) => {
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  if ((typeof userEmail || typeof userPassword) !== "string") {
    res.status(401).send({ message: "Invalid email or password" });
    return;
  }
  const sqlQuery = "SELECT id, email, password FROM user where user.email = ?";
  connection.query(sqlQuery, userEmail, (err, matchs) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error retrieving user and password" });
      return;
    }
    const oneMatchFound = matchs.length === 1;
    if (!oneMatchFound || matchs[0].password !== userPassword) {
      res.status(401).send({ message: "Wrong email or password" });
      return;
    } else {
      jwt.sign(
        { sub: matchs[0].id, iss: "batch-cooker", scopes: ["admin", "user"] },
        process.env.JWT_SECRET_KEY,
        { algorithm: "HS256", expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: "Error signing token" });
          }
          res.cookie("access_token", token, { httpOnly: true, sameSite: true });
          res.status(200).send({ message: "Login suceeded" });
        }
      );
    }
  });
});

app.post("/api/register", (req, res) => {
  const formData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  const sqlQuery = "INSERT INTO user SET ?";
  connection.query(sqlQuery, formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error registering user" });
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = app;
