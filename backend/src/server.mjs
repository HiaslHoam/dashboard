import express from "express";
import ServerError from "./logic/error.mjs";
import {
  getUserById,
  getUserByIdHandler,
  getUsers,
  getUsersHandler,
  loginUser,
} from "./routes/users.mjs";
import cors from "cors";
import {
  getWeatherCurrentByLocationIdHandler,
  getWeatherForecastByLocationIdHandler,
  getWeatherHandler,
} from "./routes/weather.mjs";

export const getServer = () => {
  // Create a new http (express) server
  const app = express();

  // Add CORS configuration
  app.use(cors());

  // Parse all bodies to json
  app.use(express.json());

  //TODO: AJV as input validation

  const ROUTES = [
    {
      method: "get",
      path: "/",
      handler: async (req, res) => {
        return res.sendStatus(200);
      },
    },
    {
      method: "get",
      path: "/users",
      handler: getUsersHandler,
    },
    {
      method: "get",
      path: "/weather",
      handler: getWeatherHandler,
    },
    {
      method: "get",
      path: "/users/:id",
      handler: getUserByIdHandler,
    },
    {
      method: "get",
      path: "/weather/current/:locationId",
      handler: getWeatherCurrentByLocationIdHandler,
    },
    {
      method: "get",
      path: "/weather/forecast/:locationId",
      handler: getWeatherForecastByLocationIdHandler,
    },
    {
      method: "post",
      path: "/login",
      handler: async (req, res) => {
        const { id, password } = req.params;
        const token = await loginUser(id, password);
        return res.json({ token });
      },
    },
  ];

  ROUTES.forEach((route) => {
    app[route.method](route.path, async (req, res) => {
      try {
        await route.handler(req, res);
      } catch (err) {
        if (err instanceof ServerError) {
          return res.status(400).send(err.message);
        } else {
          console.error(err);
          return res.status(500).send("Internal server error occured");
        }
      }
    });
  });

  return app;
};
