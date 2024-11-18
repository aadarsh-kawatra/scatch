const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product.model");
const { addToCart } = require("../controllers/user-controller");
const userModel = require("../models/user.model");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedin, async (req, res) => {
  const products = await productModel.find({});
  const success = req.flash("success");
  const error = req.flash("error");
  res.render("shop", { loggedIn: true, products, success, error });
});

router.get("/addToCard/:id", isLoggedin, addToCart);

router.get("/cart", isLoggedin, async (req, res) => {
  const { email } = req._user;
  const { cart } = await userModel
    .findOne({ email })
    .populate("cart.product")
    .select("cart");
  let price = { total: 0, discount: 0, shipping: 0, platform_fee: 20 };
  cart.forEach((ele) => {
    price.total += ele.product.price * ele.quantity;
    price.discount += ele.product.discount * ele.quantity;
  });
  res.render("cart", { loggedIn: true, cart, price });
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  return res.redirect("/");
});

module.exports = router;
