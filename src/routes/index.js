const express = require("express");
const router = express.Router();
const loginRoutes = require("./login.routes");
const registerRoutes = require("./register.routes");
const dashboardRoutes = require("./dashboard.routes");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.use("/health-check", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

router.use("/register", registerRoutes);

router.use("/login", loginRoutes);

router.use("/dashboard", isLoggedIn, dashboardRoutes);

module.exports = router;
