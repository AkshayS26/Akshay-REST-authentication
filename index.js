const express = require("express");
const request = require("request");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

const secretKey = process.env.JWT_SECRET;

app.use(express.json());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/capsules", authenticateJWT, (req, res) => {
  request.get(
    "https://api.spacexdata.com/v4/capsules",
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ message: "Error getting capsules data" });
      }

      res.json(JSON.parse(body));
    }
  );
});

// Generate JWT token for authorized requests
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, secretKey);
  res.json({ accessToken });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

module.exports = app;
