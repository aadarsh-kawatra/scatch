const mongoose = require("mongoose");
const debuger = require("debug")("dev:mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => debuger(`MongoDB Connected`))
  .catch((err) => debuger(err));

module.exports = mongoose.connection;
