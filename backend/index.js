const express = require("express");
const database = require("./database_connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "test";

app.use(cors());
app.use(bodyParser.json());
app.get("/", (request, response, next) => {
  response.sendStatus(200);
});

app.post("/users", (request, response, next) => {
  bcrypt.hash(request.body.password, 10).then((hashedPassword) => {
    return database("user")
      .insert({
        username: request.body.username,
        password_digest: hashedPassword,
      })
      .returning(["id", "username"])
      .then((users) => {
        response.json(users[0]);
      })
      .catch((error) => next(error));
  });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  database("user")
    .where({ id })
    .then((users) => {
      res.json(users);
    });
});

const updateUser = async (req, res) => {
  try {
    const { username, strava_refresh } = req.body;

    const user = {};

    if (username) user.username = username;
    if (strava_refresh) user.strava_refresh = strava_refresh;
    await database("user")
      .where("id", req.params.id)
      .update(user)
      .then(() => {
        database
          .select()
          .from("user")
          .where("id", req.params.id)
          .then((user) => {
            res.send(user[0]);
          });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

app.put("/users/:id", updateUser);

app.post("/login", (request, response, next) => {
  database("user")
    .where({ id: request.body.id })
    .first()
    .then((user) => {
      if (!user) {
        response.status(401).json({
          error: "No user by that name",
        });
      } else {
        return bcrypt
          .compare(request.body.password, user.password_digest)
          .then((isAuthenticated) => {
            if (!isAuthenticated) {
              response.status(401).json({
                error: "Unauthorized Access!",
              });
            } else {
              return jwt.sign(user, SECRET, (error, token) => {
                response.status(200).json({ token });
              });
            }
          });
      }
    });
});

app.get("/verify", (request, response, next) => {
  if (request.headers.authorization) {
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET, (error, decodedToken) => {
      if (error) {
        response.status(401).json({
          message: "Unauthorized Access!",
        });
      } else {
        response.status(200).json({
          id: decodedToken.id,
          username: decodedToken.username,
        });
      }
    });
  } else {
    response.status(400).json({
      message: "No Token provided!",
    });
  }
});

app.listen(8000);
