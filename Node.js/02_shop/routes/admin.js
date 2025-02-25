const express = require("express");
const path = require("path");

const router = express.Router();

const products = []

router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); // send response
  res.render('add-product', {pageTitle: 'Add Product'})
});

router.post("/add-product", (req, res) => {
  ///will only execute for post request
  const {name, price, desc} = req.body
  products.push({name, price, desc})
  res.redirect("/");
});

// module.exports = router;
exports.routes = router
exports.products = products