import knex from "knex";
import knexConfig from "../../knexfile.mjs";

export const database = knex(knexConfig.development);
