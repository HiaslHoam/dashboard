/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username").notNullable();
    tbl.string("passwordDigest").notNullable();
    tbl.uuid("currentLocation").unsigned();
    tbl.foreign("currentLocation").references("locations.id");
    tbl.string("stravaRefresh");
    tbl.timestamps();
  });
  await knex.schema.createTable("locations", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("locationName").notNullable();
    tbl.integer("lat").notNullable();
    tbl.integer("long").notNullable();
    tbl.integer("alt").notNullable().defaultTo(0);
    tbl.integer("apiLocationId");
    tbl.string("imgUrl", 511);
    tbl.timestamps();
  });
  await knex.schema.createTable("weather", (tbl) => {
    tbl.increments("id").notNullable().index().unique();
    tbl.timestamp("time").notNullable();
    tbl.uuid("locationId").unsigned();
    tbl.foreign("locationId").references("locations.id");
    tbl.boolean("isForecast").notNullable().defaultTo(false);
    tbl.string("forecastType");
    tbl.string("symbol");
    tbl.string("symbolPhrase");
    tbl.integer("temperature");
    tbl.integer("minTemp");
    tbl.integer("maxTemp");
    tbl.integer("feelsLikeTemp");
    tbl.integer("relHumidity");
    tbl.integer("minRelHumidity");
    tbl.integer("maxRelHumidity");
    tbl.integer("windSpeed");
    tbl.integer("maxWindSpeed");
    tbl.integer("windGust");
    tbl.integer("maxWindGust");
    tbl.string("windDirString");
    tbl.integer("windDir");
    tbl.integer("precipProb");
    tbl.integer("precipRate");
    tbl.integer("precipAccum");
    tbl.integer("uvIndex");
    tbl.integer("pressure");
    tbl.timestamp("sunrise");
    tbl.timestamp("sunset");
    tbl.timestamp("moonrise");
    tbl.timestamp("moonset");
    tbl.integer("moonPhase");
    tbl.integer("confidence");
    tbl.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("weather");
  await knex.schema.dropTableIfExists("locations");
};
