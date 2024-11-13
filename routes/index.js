const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedin, (req, res) => {
  res.render("shop", { products: [] });
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  return res.redirect("/");
});

module.exports = router;
