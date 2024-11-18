const userModel = require("../models/user.model");
const { hashValue, compareHash } = require("../utils/hash");
const { generateToken } = require("../utils/token");

module.exports.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists");
      return res.redirect("/");
    }

    const hashedPassword = await hashValue(password);
    const newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = generateToken({ user_id: newUser._id, email });
    res.cookie("token", token);
    return res.redirect("/shop");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "User Registration Failed");
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      req.flash("error", "Invalid Credentials");
      return res.redirect("/");
    }

    const verify = await compareHash(password, existingUser.password);
    if (!verify) {
      req.flash("error", "Invalid Credentials");
      return res.redirect("/");
    }

    const token = generateToken({ user_id: existingUser._id, email });
    res.cookie("token", token);
    return res.redirect("/shop");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "User Login Failed");
    return res.redirect("/");
  }
};

module.exports.addToCart = async (req, res) => {
  const { email } = req._user;
  const { id: product_id } = req.params;
  try {
    const user = await userModel.findOne({ email });
    const cartIndex = user.cart.findIndex(
      (ele) => ele.product.toString() === product_id
    );
    if (cartIndex >= 0) {
      user.cart.at(cartIndex).quantity++;
    } else {
      user.cart.push({ product: product_id, quantity: 1 });
    }
    await user.save();
    req.flash("success", "Product added to Cart");
    return res.redirect("/shop");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Failed to add Cart");
    return res.redirect("/shop");
  }
};
