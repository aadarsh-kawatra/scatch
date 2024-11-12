const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Owners saying Hello");
});

module.exports = router;
