const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: Number, required: true },
  gstin: { type: String, required: true },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  ],
});

const ownerModel = mongoose.model("owner", ownerSchema);

module.exports = ownerModel;
