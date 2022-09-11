const knex = require("knex");
const config = require("../knexfile.mjs");

const db = knex(config.development);

module.exports = {
  findUser,
  findUserById,
  insertUser,
  updateUser,
  removeUser,
  findWeather,
  findWeatherById,
  insertWeather,
  updateWeather,
  removeWeather,
};

function findUser() {
  return db("user");
}

function findUserById(id) {
  return db("user").where({ id: Number(id) });
}

function insertUser(post) {
  return db("user")
    .insert(post)
    .then((ids) => {
      id: ids[0];
    });
}

function updateUser(id, post) {
  return db("user").where("id", Number(id)).update(post);
}

function removeUser(id) {
  return db("user").where("id", Number(id)).del();
}

function findWeather() {
  return db("user");
}

function findWeatherById(id) {
  return db("user").where({ id: Number(id) });
}

function insertWeather(post) {
  return db("user")
    .insert(post)
    .then((ids) => {
      id: ids[0];
    });
}

function updateWeather(id, post) {
  return db("user").where("id", Number(id)).update(post);
}

function removeWeather(id) {
  return db("user").where("id", Number(id)).del();
}
