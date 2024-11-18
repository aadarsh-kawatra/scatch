const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productModel = require("../models/product.model");

router.get("/", (req, res) => {
  res.send("Products saying Hello");
});

router.post("/create", upload.single("image"), async (req, res) => {
  const image = req.file.buffer;
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  try {
    const newProduct = await productModel.create({
      name,
      image,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully");
    return res.redirect("/owner/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create product");
  }
});

module.exports = router;
