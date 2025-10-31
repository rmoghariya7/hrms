const config = require("../../knexfile");
const { default: knex } = require("knex");

const db = knex(config.development);

module.exports = db;
