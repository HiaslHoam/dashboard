const knex = require("knex");
const config = require("../knexfile.js");

const db = knex(config.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db("dashboard");
}

function findById(id) {
  return db("dashboard").where({ id: Number(id) });
}

function insert(post) {
  return db("dashboard")
    .insert(post)
    .then((ids) => {
      id: ids[0];
    });
}

function update(id, post) {
  return db("dashboard").where("id", Number(id)).update(post);
}

function remove(id) {
  return db("dashboard").where("id", Number(id)).del();
}
