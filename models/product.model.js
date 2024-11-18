const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: Buffer, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  bgcolor: { type: String, required: true },
  panelcolor: { type: String, required: true },
  textcolor: { type: String, required: true },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
