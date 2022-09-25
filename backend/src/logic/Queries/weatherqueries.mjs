import { database } from "../database.mjs";
import axios from "axios";
import axiosqueue from "./axiosqueue.mjs";

export async function fetchWeatherForecast(
  apiLocationId,
  locationAlt,
  forecast
) {
  const url = `https://foreca-weather.p.rapidapi.com/${
    forecast === "current" ? "current" : `forecast/${forecast}`
  }/${apiLocationId}`;

  const options = {
    method: "GET",
    params: {
      alt: `${locationAlt}`,
      tempunit: "C",
      windunit: "MS",
      tz: "Europe/Berlin",
      periods: "12",
      dataset: "full",
      lang: "de",
    },
    headers: {
      "X-RapidAPI-Key": "a988feaf5bmsh02ece402868f339p1f1668jsn72ce021b7067",
      "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
    },
  };
  try {
    const response = await axiosqueue.get(url, options);
    console.log(`Weather-Api fetched for location ${apiLocationId}`);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function writeWeatherCurrent(locationId) {
  const location = await database("locations")
    .where("id", "=", locationId)
    .first();
  const apiLocationId = location.apiLocationId;
  const locationAlt = location.alt;
  const response = await fetchWeatherForecast(
    apiLocationId,
    locationAlt,
    "current"
  );
  const {
    time,
    isForecast,
    symbol,
    symbolPhrase,
    temperature,
    feelsLikeTemp,
    relHumidity,
    windSpeed,
    windGust,
    windDirString,
    precipProb,
    precipRate,
    uvIndex,
    pressure,
  } = response.data.current;

  const weather = {
    time,
    isForecast,
    symbol,
    symbolPhrase,
    temperature,
    feelsLikeTemp,
    relHumidity,
    windSpeed,
    windGust,
    windDirString,
    precipProb,
    precipRate,
    uvIndex,
    pressure,
    isForecast: false,
    locationId: locationId,
  };
  return database("weather").insert(weather);
}

export async function writeWeatherForecastHourly(locationId) {
  const location = await database("locations")
    .where("id", "=", locationId)
    .first();
  const apiLocationId = location.apiLocationId;
  const locationAlt = location.alt;
  const response = await fetchWeatherForecast(
    apiLocationId,
    locationAlt,
    "hourly"
  );
  await Promise.all(
    response.data.forecast.map(async (forecast) => {
      const {
        time,
        symbol,
        symbolPhrase,
        temperature,
        feelsLikeTemp,
        relHumidity,
        windSpeed,
        windGust,
        windDirString,
        precipProb,
        precipRate,
        uvIndex,
        pressure,
      } = forecast;

      const weather = {
        time,
        symbol,
        symbolPhrase,
        temperature,
        feelsLikeTemp,
        relHumidity,
        windSpeed,
        windGust,
        windDirString,
        precipProb,
        precipRate,
        uvIndex,
        pressure,
        isForecast: true,
        locationId: locationId,
        forecastType: "hourly",
      };
      const existing = await database("weather")
        .where("isForecast", "=", true)
        .where("forecastType", "=", "hourly")
        .where("locationId", "=", weather.locationId)
        .where("time", "=", weather.time);
      if (existing.length > 0) {
        await database("weather")
          .whereIn(
            "id",
            existing.map((e) => e.id)
          )
          .delete();
      }
      console.log(`Writing new Forecast`);
      return database("weather").insert(weather);
    })
  );
}

export async function writeWeatherForecastDaily(locationId) {
  const location = await database("locations")
    .where("id", "=", locationId)
    .first();
  const apiLocationId = location.apiLocationId;
  const locationAlt = location.alt;
  const response = await fetchWeatherForecast(
    apiLocationId,
    locationAlt,
    "daily"
  );
  await Promise.all(
    response.data.forecast.map(async (forecast) => {
      const {
        date,
        symbol,
        symbolPhrase,
        maxTemp,
        minTemp,
        maxRelHumidity,
        minRelHumidity,
        maxWindSpeed,
        maxWindGust,
        windDir,
        precipProb,
        precipAccum,
        uvIndex,
        pressure,
        confidence,
        sunrise,
        sunset,
        moonrise,
        moonset,
        moonphase,
      } = forecast;

      const time = date;

      const weather = {
        time,
        symbol,
        symbolPhrase,
        maxTemp,
        minTemp,
        maxRelHumidity,
        minRelHumidity,
        maxWindSpeed,
        maxWindGust,
        windDir,
        precipProb,
        precipAccum,
        uvIndex,
        pressure,
        confidence,
        sunrise,
        sunset,
        moonrise,
        moonset,
        moonphase,
        isForecast: true,
        locationId: locationId,
        forecastType: "daily",
      };
      const existing = await database("weather")
        .where("isForecast", "=", true)
        .where("forecastType", "=", "daily")
        .where("locationId", "=", weather.locationId)
        .where("time", "=", weather.time);
      if (existing.length > 0) {
        await database("weather")
          .whereIn(
            "id",
            existing.map((e) => e.id)
          )
          .delete();
      }
      console.log(`Writing new Forecast`);
      return database("weather").insert(weather);
    })
  );
}
