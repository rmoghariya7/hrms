const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
// db.raw("SELECT 1")
//   .then(() => console.log("✅ Connected to PostgreSQL via Knex"))
//   .catch((err) => console.error("❌ Connection error:", err));

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Running on port 3000 ✅");
});
