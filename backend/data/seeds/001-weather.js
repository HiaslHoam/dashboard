/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("weather").del();
  await knex("weather").insert([
    { id: 1, location_name: "Ürzig", lat: "49.98", long: "7.01" },
    { id: 2, location_name: "München", lat: "48.14", long: "11.58" },
  ]);
};
