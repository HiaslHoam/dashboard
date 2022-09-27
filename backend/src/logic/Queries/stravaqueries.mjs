import { database } from "../database.mjs";
import axios from "axios";
import axiosqueue from "./axiosqueue.mjs";

export function getMonday() {
  var oldDate = new Date();
  var prevMonday = new Date(oldDate.toDateString());
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));

  return prevMonday;
}

export async function fetchStravaData(stravaRefresh, before, after) {
  try {
    const response = await axiosqueue.post(
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
      const before = new Date();
      const after = getMonday();
      const response = await axiosqueue.get(
        `https://www.strava.com/api/v3/athlete/activities?before=${
          before.getTime() / 1000
        }&after=${Math.floor(after.getTime() / 1000)}`,
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

export async function getStravaActivityById(id, stravaRefresh) {
  try {
    const response = await axiosqueue.post(
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
      const response = await axiosqueue.get(
        `https://www.strava.com/api/v3/activities/${id}`,
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

export async function writeStravaActivityData(
  userId,
  stravaRefresh,
  before,
  after
) {
  const activites = await fetchStravaData(stravaRefresh, before, after);
  await Promise.all(
    activites.data.map(async (activityStream) => {
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
      const startDate = new Date(start_date_local);
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
        startDate: startDate.getTime() / 1000,
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
        //photoUrl,
        userId: userId,
      };

      const activityFetch = await getStravaActivityById(id, stravaRefresh);
      let activityDetail = {
        ...activity,
        photoUrl: activityFetch.data.photos?.primary?.urls["600"],
      };
      console.log(activityFetch.data.photos?.primary?.urls["600"]);

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
      return database("activities").insert(activityDetail);
    })
  );
}
