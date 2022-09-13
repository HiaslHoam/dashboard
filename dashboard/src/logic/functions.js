export async function getWeather(locationId) {
  const axios = require("axios");
  try {
    const response = await axios.get(
      `http://localhost:8000/weather/current/${locationId}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getWeatherForecast(locationId) {
  const axios = require("axios");
  try {
    const response = await axios.get(
      `http://localhost:8000/weather/forecast/${locationId}`
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getStravaRefreshToken() {
  const axios = require("axios");
  try {
    const response = await axios.get("http://192.168.178.28:8000/users/1");
    return response;
  } catch (err) {
    console.error(err);
  }
}

export function getMonday() {
  var oldDate = new Date();
  var prevMonday = new Date(oldDate.toDateString());
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
  return Math.floor(prevMonday / 1000);
}

export async function getStravaData() {
  const refresh = await getStravaRefreshToken();
  const axios = require("axios");
  try {
    const response = await axios.post(
      `https://www.strava.com/oauth/token?client_id=88883&client_secret=ec860807904b007cf49401fcd46df778782db75d&grant_type=refresh_token&refresh_token=${refresh.data.stravaRefresh}`
    );
    const access_token = response.data.access_token;
    console.log(access_token);
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const before = Math.floor(Date.now() / 1000);
      //const after = getMonday();
      let after = 1652375110;
      const response = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}`,
        options
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}
