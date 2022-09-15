/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("locations").del();
  await knex("locations").insert([
    {
      id: 1,
      locationName: "Ürzig",
      lat: "49.98",
      long: "7.01",
      alt: "200",
      apiLocationId: "102818121",
    },
    {
      id: 2,
      locationName: "München",
      lat: "48.14",
      long: "11.58",
      alt: "510",
      apiLocationId: "102867714",
    },
    {
      id: 3,
      locationName: "Bad Wiessee",
      lat: "48.72",
      long: "11.72",
      alt: "747",
      apiLocationId: "102953318",
    },
  ]);
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "Matthias",
      passwordDigest:
        "$2b$10$El92.8dwUoM27pSb5Ibjy.IxEluLKsk7VX3RgqCwDNq3iUyw6eg56",
      stravaRefresh: "18e853f11cea61874f6358ee1986c07db2d15166",
      currentLocation: 1,
    },
    {
      id: 2,
      username: "Hannah",
      passwordDigest:
        "$2b$10$El92.8dwUoM27pSb5Ibjy.IxEluLKsk7VX3RgqCwDNq3iUyw6eg56",

      currentLocation: 2,
    },
  ]);
  await knex("weather").del();
  await knex("strava").del();
  await knex("strava").insert([
    {
      id: 1,
      userId: 1,
      stravaRefresh: "18e853f11cea61874f6358ee1986c07db2d15166",
    },
  ]);
};
