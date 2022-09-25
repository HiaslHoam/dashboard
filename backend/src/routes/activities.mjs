import { database } from "../logic/database.mjs";
import ServerError from "../logic/error.mjs";
import { getMonday } from "../logic/Queries/stravaqueries.mjs";

export const getActivity = async () => {
  const monday = getMonday();
  const mondayFetch = monday.getTime() / 1000;
  const activities = await database("activities")
    .where("startDate", ">=", mondayFetch)
    .orderBy("startDate", "desc");
  return activities;
};

export const getActivitiesHandler = async (req, res) => {
  const activities = await getActivity();
  return res.json(
    activities.map((activity) => ({
      id: activity.activityId,
      name: activity.name,
      distance: activity.distance,
      activityId: activity.activityId,
      movingTime: activity.movingTime,
      elapsedTime: activity.elapsedTime,
      elevationGain: activity.elevationGain,
      type: activity.type,
      startDate: activity.startDate,
      kudosCount: activity.kudosCount,
      mapPoly: activity.mapPoly,
      averageSpeed: activity.averageSpeed,
      maxSpeed: activity.maxSpeed,
      deviceWatts: activity.deviceWatts,
      averageWatts: activity.averageWatts,
      kilojoules: activity.kilojoules,
      hasHeartrate: activity.hasHeartrate,
      averageHeartrate: activity.averageHeartrate,
      maxHeartrate: activity.maxHeartrate,
      elevHigh: activity.elevHigh,
      elevLow: activity.elevLow,
      sufferScore: activity.sufferScore,
      photoUrl: activity.photoUrl,
      averageNormalizedPower: activity.averageNormalizedPower,
      userId: activity.userId,
    }))
  );
};

export const getActivityById = async (id) => {
  const activity = await database("activities")
    .where("activityId", "=", id)
    .first();
  if (!activity) {
    throw new ServerError(
      "No user could be found with this username or password."
    );
  }
  return activity;
};

export const getActivityByIdHandler = async (req, res) => {
  const { id } = req.params;
  const activity = await getActivityById(id);
  return res.json({
    id: activity.activityId,
    name: activity.name,
  });
};
