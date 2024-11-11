const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  color: {
    bg: { type: String, required: true },
    panel: { type: String, required: true },
    text: { type: String, required: true },
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
