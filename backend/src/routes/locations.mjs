import { database } from "../logic/database.mjs";
import ServerError from "../logic/error.mjs";

export const getLocations = async () => {
  const locations = await database("locations");
  return locations;
};

export const getLocationsHandler = async (req, res) => {
  const locations = await getLocations();
  return res.json(
    locations.map((location) => ({
      id: location.id,
      locationName: location.locationName,
    }))
  );
};
