import { getWeatherForAllLocations } from "./src/logic/queries.mjs";
import { getServer } from "./src/server.mjs";

/*
const SECRET = "test";

app.post("/users", (request, response, next) => {
  hash(request.body.password, 10).then((hashedPassword) => {
    return database("user")
      .insertUser({
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

app.get("/weather/:id", async (req, res) => {
  const { id } = req.params;

  database("weather")
    .where({ id })
    .then((weather) => {
      res.json(weather);
    });
});

app.get("/weather", async (req, res) => {
  database("weather").then((weather) => {
    res.json(weather);
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
        select()
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

const updateWeather = async (req, res) => {
  try {
    const {
      location_name,
      lat,
      long,
      current,
      forecast_hourly,
      forecast_daily,
      img_url,
    } = req.body;

    const weather = {};

    if (location_name) weather.location_name = location_name;
    if (lat) weather.lat = lat;
    if (long) weather.long = long;
    if (current) weather.current = current;
    if (forecast_hourly) weather.forecast_hourly = forecast_hourly;
    if (forecast_daily) weather.forecast_daily = forecast_daily;
    if (img_url) weather.img_url = img_url;

    await database("weather")
      .where("id", req.params.id)
      .update(weather)
      .then(() => {
        select()
          .from("weather")
          .where("id", req.params.id)
          .then((weather) => {
            res.send(weather[0]);
          });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

app.put("/users/:id", updateUser);
app.put("/weather/:id", updateWeather);

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
        const compare(request.body.password, user.password_digest).then(
          (isAuthenticated) => {
            if (!isAuthenticated) {
              throw new ServerError("Unauthorized Access");
            } else {
              return sign(user, SECRET, (error, token) => {
                response.status(200).json({ token });
              });
            }
          }
        );
      }
    });
});

app.get("/verify", (request, response, next) => {
  if (request.headers.authorization) {
    const token = request.headers.authorization.split(" ")[1];
    verify(token, SECRET, (error, decodedToken) => {
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

*/

const app = getServer();

app.listen(8000, () => {
  console.log("Server started at http://localhost:8000");
  //getWeatherForAllLocations();
  setInterval(getWeatherForAllLocations, 300000);
});
