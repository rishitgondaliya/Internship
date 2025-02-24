const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); // send response
});

router.post("/product", (req, res) => {
  ///will only execute for post request
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
