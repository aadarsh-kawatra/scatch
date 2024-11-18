const { verifyToken } = require("../utils/token");
const userModel = require("../models/user.model");

async function isLoggedin(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  try {
    const decoded = verifyToken(req.cookies.token);
    const user = await userModel.findById(decoded.user_id).select("-password");
    req._user = user;
    next();
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.cookie("token", "");
    return res.redirect("/");
  }
}

module.exports = isLoggedin;
