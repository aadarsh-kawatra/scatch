const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String },
  address: { type: String },
  contact: { type: Number },
  cart: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "product" },
      quantity: { type: Number },
    },
  ],
  orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
