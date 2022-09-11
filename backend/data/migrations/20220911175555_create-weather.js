/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("weather", (tbl) => {
    tbl.increments();
    tbl.string("location_name").notNullable();
    tbl.integer("lat").notNullable();
    tbl.integer("long").notNullable();
    tbl.json("current");
    tbl.json("forecast_hourly");
    tbl.json("forecast_daily");
    tbl.string("img_url");
    tbl.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("weather");
};
