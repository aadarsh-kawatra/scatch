const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/scatch")
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.error(err));

module.exports = mongoose.connection;
