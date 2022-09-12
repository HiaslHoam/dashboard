/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("locations").del();
  await knex("locations").insert([
    { id: 1, locationName: "Ürzig", lat: "49.98", long: "7.01", alt: "200" },
    {
      id: 2,
      locationName: "München",
      lat: "48.14",
      long: "11.58",
      alt: "510",
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
    },
    {
      id: 2,
      username: "Hannah",
      passwordDigest:
        "$2b$10$El92.8dwUoM27pSb5Ibjy.IxEluLKsk7VX3RgqCwDNq3iUyw6eg56",
    },
  ]);
  await knex("weather").del();
  await knex("weather").insert([
    {
      locationId: 2,
      temperature: 21,
      feelsLikeTemp: 21,
      isForecast: false,
      time: "2022-09-12T17:02+02:00",
    },
    {
      locationId: 2,
      temperature: 21,
      feelsLikeTemp: 21,
      isForecast: true,
      time: "2022-09-12T18:00+02:00",
    },
  ]);
};
