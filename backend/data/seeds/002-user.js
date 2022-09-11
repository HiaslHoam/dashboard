/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      id: 1,
      username: "Matthias",
      password_digest:
        "$2b$10$El92.8dwUoM27pSb5Ibjy.IxEluLKsk7VX3RgqCwDNq3iUyw6eg56",
      strava_refresh: "18e853f11cea61874f6358ee1986c07db2d15166",
    },
    {
      id: 2,
      username: "Hannah",
      password_digest:
        "$2b$10$El92.8dwUoM27pSb5Ibjy.IxEluLKsk7VX3RgqCwDNq3iUyw6eg56",
    },
  ]);
};
