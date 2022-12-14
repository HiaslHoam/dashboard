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
      windDir: weather.windDir,
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

export const getWeatherForecastHourlyByLocationId = async (locationId) => {
  const weather = await database("weather")
    .where("locationId", "=", locationId)
    .where("isForecast", "=", true)
    .where("forecastType", "=", "hourly")
    .orderBy("time", "desc")
    .limit(11);
  if (!weather) {
    throw new ServerError("No weather could be found for this location ID.");
  }
  weather.sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });
  return weather;
};

export const getWeatherForecastHourlyByLocationIdHandler = async (req, res) => {
  const { locationId } = req.params;
  const weather = await getWeatherForecastHourlyByLocationId(locationId);
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
      forecastType: weather.forecastType,
    }))
  );
};

export const getWeatherForecastByLocationId = async (locationId) => {
  const weather = await database("weather")
    .where("locationId", "=", locationId)
    .where("isForecast", "=", true)
    .where("forecastType", "=", "daily")
    .orderBy("time", "desc")
    .limit(12);
  if (!weather) {
    throw new ServerError("No weather could be found for this location ID.");
  }
  weather.sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });
  return weather;
};

export const getWeatherForecastDailyByLocationIdHandler = async (req, res) => {
  const { locationId } = req.params;
  const weather = await getWeatherForecastByLocationId(locationId);
  return res.json(
    weather.map((weather) => ({
      locationId: weather.locationId,
      time: weather.time,
      isForecast: weather.isForecast,
      forecastType: weather.forecastType,
      symbol: weather.symbol,
      symbolPhrase: weather.symbolPhrase,
      maxTemp: weather.maxTemp,
      minTemp: weather.minTemp,
      maxRelHumidity: weather.maxRelHumidity,
      minRelHumidity: weather.minRelHumidity,
      maxWindSpeed: weather.maxWindSpeed,
      maxWindGust: weather.maxWindGust,
      windDir: weather.windDir,
      precipProb: weather.precipProb,
      precipAccum: weather.precipAccum,
      uvIndex: weather.uvIndex,
      pressure: weather.pressure,
      confidence: weather.confidence,
      sunrise: weather.sunrise,
      sunset: weather.sunset,
      createdAt: weather.createdAt,
    }))
  );
};
