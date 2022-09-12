import { database } from "../logic/database.mjs";
import ServerError from "../logic/error.mjs";

export const getWeather = async () => {
  const weather = await database("weather");
  return weather;
};

export const getWeatherHandler = async (req, res) => {
  const weather = await getWeather();
  return res.json(
    weather.map((weather) => ({
      locationId: weather.locationId,
      time: weather.time,
      isForecast: weather.isForecast,
      symbol: weather.symbol,
      symbolPhrase: weather.symbolPhrase,
      temperature: weather.temperature,
      feelsLikeTemp: weather.feelsLikeTemp,
      relHumidity: weather.relHumidity,
      windSpeed: weather.windSpeed,
      windGust: weather.windGust,
      windDirString: weather.windDirString,
      precipProb: weather.precipProb,
      precipRate: weather.precipRate,
      uvIndex: weather.uvIndex,
      pressure: weather.pressure,
      createdAt: weather.createdAt,
    }))
  );
};

export const getWeatherCurrentByLocationId = async (locationId) => {
  const weather = await database("weather")
    .where("locationId", "=", locationId)
    .where("isForecast", "=", 0)
    .orderBy("time", "desc")
    .first();
  if (!weather) {
    throw new ServerError("No weather could be found for this location ID.");
  }
  return weather;
};

export const getWeatherCurrentByLocationIdHandler = async (req, res) => {
  const { locationId } = req.params;
  const weather = await getWeatherCurrentByLocationId(locationId);
  console.log(weather);
  return res.json({
    locationId: weather.locationId,
    time: weather.time,
    isForecast: weather.isForecast,
    symbol: weather.symbol,
    symbolPhrase: weather.symbolPhrase,
    temperature: weather.temperature,
    feelsLikeTemp: weather.feelsLikeTemp,
    relHumidity: weather.relHumidity,
    windSpeed: weather.windSpeed,
    windGust: weather.windGust,
    windDirString: weather.windDirString,
    precipProb: weather.precipProb,
    precipRate: weather.precipRate,
    uvIndex: weather.uvIndex,
    pressure: weather.pressure,
    createdAt: weather.createdAt,
  });
};

export const getWeatherForecastByLocationId = async (locationId) => {
  const weather = await database("weather")
    .where("locationId", "=", locationId)
    .where("isForecast", "=", true)
    .orderBy("time", "desc")
    .limit(8);
  if (!weather) {
    throw new ServerError("No weather could be found for this location ID.");
  }
  return weather;
};

export const getWeatherForecastByLocationIdHandler = async (req, res) => {
  const { locationId } = req.params;
  const weather = await getWeatherForecastByLocationId(locationId);
  return res.json(
    weather.map((weather) => ({
      locationId: weather.locationId,
      time: weather.time,
      isForecast: weather.isForecast,
      symbol: weather.symbol,
      symbolPhrase: weather.symbolPhrase,
      temperature: weather.temperature,
      feelsLikeTemp: weather.feelsLikeTemp,
      relHumidity: weather.relHumidity,
      windSpeed: weather.windSpeed,
      windGust: weather.windGust,
      windDirString: weather.windDirString,
      precipProb: weather.precipProb,
      precipRate: weather.precipRate,
      uvIndex: weather.uvIndex,
      pressure: weather.pressure,
      createdAt: weather.createdAt,
    }))
  );
};
