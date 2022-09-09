export async function getWeather() {
  const axios = require("axios");
  const options = {
    method: "GET",
    url: "https://foreca-weather.p.rapidapi.com/current/102867714",
    params: {
      alt: "0",
      tempunit: "C",
      windunit: "MS",
      tz: "Europe/Berlin",
      lang: "de",
    },
    headers: {
      "X-RapidAPI-Key": "a988feaf5bmsh02ece402868f339p1f1668jsn72ce021b7067",
      "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.get(
      "https://foreca-weather.p.rapidapi.com/current/102867714",
      options
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}
