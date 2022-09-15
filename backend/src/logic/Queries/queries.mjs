import { database } from "../database.mjs";
import { writeWeatherCurrent, writeWeatherForecastDaily, writeWeatherForecastHourly } from "./weatherqueries.mjs";

export async function queries() {
  const locations = await database("locations");
  locations.forEach((location) => {
    writeWeatherCurrent(location.id);
    writeWeatherForecastHourly(location.id);
    writeWeatherForecastDaily(location.id);
  });
}