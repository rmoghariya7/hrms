// const { Pool } = require("pg");
// const util = require("util");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "tutorial_db",
//   password: "admin",
//   port: 1234,
// });

// // Test connection
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("❌ Connection failed:", err);
//   } else {
//     console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
//   }
// });

// module.exports = pool;

{
  // Vanilla JS
  /*--------------------------------------------------*/
  // knex configuration
}

const config = require("../../knexfile");
const { default: knex } = require("knex");

const db = knex(config.development);

module.exports = db;
