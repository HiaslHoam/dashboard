/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();

    tbl.string("username").notNullable();
    tbl.string("password_digest").notNullable();
    tbl.string("strava_refresh");
    tbl.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
