const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/user-controller");

router.get("/", (req, res) => {
  res.send("Users saying Hello");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
