const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Products saying Hello");
});

module.exports = router;
