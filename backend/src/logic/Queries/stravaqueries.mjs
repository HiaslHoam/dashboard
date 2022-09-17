import { database } from "../database.mjs";
import axios from "axios";
import axiosqueue from "./axiosqueue.mjs";

export function getMonday() {
  var oldDate = new Date();
  var prevMonday = new Date(oldDate.toDateString());
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
  return Math.floor(prevMonday / 1000);
}

export async function fetchStravaData(stravaRefresh) {
  try {
    const response = await axios.post(
      `https://www.strava.com/oauth/token?client_id=88883&client_secret=ec860807904b007cf49401fcd46df778782db75d&grant_type=refresh_token&refresh_token=${stravaRefresh}`
    );
    const access_token = response.data.access_token;
    console.log("access_token gained");
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const before = Math.floor(Date.now() / 1000);
      const after = getMonday();
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

export async function writeStravaActivityData(userId, stravaRefresh) {
  const response = await fetchStravaData(stravaRefresh);
  await Promise.all(
    response.data.map(async (activityStream) => {
      const {
        name,
        distance,
        id,
        moving_time,
        elapsed_time,
        total_elevation_gain,
        sport_type,
        start_date_local,
        kudos_count,
        map,
        average_speed,
        max_speed,
        device_watts,
        average_watts,
        kilojoules,
        has_heartrate,
        average_heartrate,
        max_heartrate,
        elev_high,
        elev_low,
        suffer_score,
      } = activityStream;
      const activityId = id.toFixed(0);
      const movingTime = moving_time;
      const elapsedTime = elapsed_time;
      const elevationGain = total_elevation_gain;
      const type = sport_type;
      const startDate = start_date_local;
      const kudosCount = kudos_count;
      const mapPoly = map?.summary_polyline;
      const averageSpeed = average_speed;
      const maxSpeed = max_speed;
      const deviceWatts = device_watts;
      const averageWatts = average_watts;
      const hasHeartrate = has_heartrate;
      const averageHeartrate = average_heartrate;
      const maxHeartrate = max_heartrate;
      const elevHigh = elev_high;
      const elevLow = elev_low;
      const sufferScore = suffer_score;

      const activity = {
        name,
        distance,
        activityId,
        movingTime,
        elapsedTime,
        elevationGain,
        type,
        startDate,
        kudosCount,
        mapPoly,
        averageSpeed,
        maxSpeed,
        deviceWatts,
        averageWatts,
        kilojoules,
        hasHeartrate,
        averageHeartrate,
        maxHeartrate,
        elevHigh,
        elevLow,
        sufferScore,
        userId: userId,
      };
      const existing = await database("activities").where(
        "activityId",
        "=",
        activityId
      );
      if (existing.length > 0) {
        await database("activities")
          .whereIn(
            "activityId",
            existing.map((e) => e.activityId)
          )
          .delete();
        console.log("Delete Strava Activity");
      }

      console.log(`Writing Strava Activity`);
      return database("activities").insert(activity);
    })
  );
}
