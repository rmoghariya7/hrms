const express = require("express");
const { registerUser } = require("../controllers/register");
const router = express.Router();

router.get("/", registerUser);

module.exports = router;
