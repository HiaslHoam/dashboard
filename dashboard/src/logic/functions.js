export async function getWeather(locationId) {
  const axios = require("axios");
  try {
    const response = await axios.get(
      `http://192.168.178.50:8000/weather/current/${locationId}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getWeatherForecastHourly(locationId) {
  const axios = require("axios");
  try {
    const response = await axios.get(
      `http://192.168.178.50:8000/weather/forecast/hourly/${locationId}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getWeatherForecastDaily(locationId) {
  const axios = require("axios");
  try {
    const response = await axios.get(
      `http://192.168.178.50:8000/weather/forecast/daily/${locationId}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getStravaData() {
  const axios = require("axios");
  try {
    const response = await axios.get("http://192.168.178.50:8000/activities/");
    return response;
  } catch (err) {
    console.error(err);
  }
}
