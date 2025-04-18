const express = require("express");
const router = express.Router();
const loginRoutes = require("./login.routes");
const registerRoutes = require("./register.routes");

router.use("/health-check", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

router.use("/register", registerRoutes);
router.use("/login", loginRoutes);

module.exports = router;
