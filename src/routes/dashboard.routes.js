const express = require("express");
const { getUser } = require("../utils/dbHelper");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await getUser(req.user.id);

  res.status(200).json({
    status: "ok",
    message: user,
  });
});

module.exports = router;
