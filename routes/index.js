const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product.model");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedin, async (req, res) => {
  const products = await productModel.find({});
  res.render("shop", { products, loggedIn: true });
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  return res.redirect("/");
});

module.exports = router;
