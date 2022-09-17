import { database } from "../database.mjs";
import { writeStravaActivityData } from "./stravaqueries.mjs";
import {
  writeWeatherCurrent,
  writeWeatherForecastDaily,
  writeWeatherForecastHourly,
} from "./weatherqueries.mjs";
import cron from "node-cron";

export async function queries() {
  const totalReq = 1000;
  const locations = await database("locations");
  const locTotal = Object.keys(locations).length;
  const hourlyMp = 0.25;
  const dailyMp = 0.02;
  const currentMp = 0.73;
  const frcHourly = Math.ceil((24 * 60) / ((totalReq / locTotal) * hourlyMp));
  const frcDaily = Math.ceil((24 * 60) / ((totalReq / locTotal) * dailyMp));
  const weather = Math.ceil((24 * 60) / ((totalReq / locTotal) * currentMp));
  console.log(
    `Alle ${frcHourly} Minuten wird der stündliche Wetterbericht neu geladen` +
      "\n" +
      `Alle ${frcDaily} Minuten wird der tägliche Wetterbericht neu geladen` +
      "\n" +
      `Alle ${weather} Minuten wird der aktuelle Wetterbericht neu geladen`
  );
  const stravauser = await database("strava");
  const strTotal = Object.keys(stravauser).length;
  const stravaTimer = Math.ceil((24 * 60) / totalReq / strTotal);
  console.log(
    `Alle ${stravaTimer} Minuten werden die Strava Aktivitäten aktuallisiert`
  );

  cron.schedule(`*/${stravaTimer} * * * *`, () => {
    stravauser.forEach((user) => {
      writeStravaActivityData(user.userId, user.stravaRefresh);
    });
  });
  cron.schedule(`*/${frcHourly} * * * *`, () => {
    locations.forEach((location) => {
      writeWeatherForecastHourly(location.id);
    });
  });
  cron.schedule(`*/${weather} * * * *`, () => {
    locations.forEach((location) => {
      writeWeatherCurrent(location.id);
    });
  });
  cron.schedule(`*/${frcDaily} * * * *`, () => {
    locations.forEach((location) => {
      writeWeatherForecastDaily(location.id);
    });
  });
}
