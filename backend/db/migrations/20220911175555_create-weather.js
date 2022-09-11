/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("weather", (tbl) => {
    tbl.increments();
    tbl.timestamp("time").notNullable();
    tbl.boolean("is_forecast").notNullable().defaultTo(false);
    tbl.string("location_name").notNullable();
    tbl.integer("lat").notNullable();
    tbl.integer("long").notNullable();
    tbl.json("current");
    tbl.json("forecast_hourly");
    tbl.json("forecast_daily");
    tbl.string("img_url", 511);
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
