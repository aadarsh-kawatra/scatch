const express = require("express");

const router = express.Router();
const ownerModel = require("../models/owner.model");
const { hashValue } = require("../utils/hash");

router.get("/", (req, res) => {
  res.send("Owners saying Hello");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const { fullname, email, password, picture, address, contact, gstin } =
      req.body;

    try {
      const hashedPassword = await hashValue(password);
      const newOwner = await ownerModel.create({
        fullname,
        email,
        password: hashedPassword,
        picture,
        address,
        contact,
        gstin,
      });
      return res.status(201).send(newOwner);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
}

module.exports = router;
