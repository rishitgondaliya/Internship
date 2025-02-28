// const express = require("express");
// const path = require("path");

// const router = express.Router();

// router.get("/add-product", (req, res) => {
//   res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); // send response
//   res.render("add-product", { pageTitle: "Add Product" });
// });

// const products = []

// router.post("/add-product", (req, res) => {
//   const {name, price, desc} = req.body
//   products.push({name, price, desc})
//   res.redirect("/");
// });

// exports.routes = router
// exports.products = products //dont need to export when using controller

// -----------Using controller--------------

const express = require("express");

const adminController = require("../controllers/admin_controller");

const router = express.Router();

router.get("/admin/add-product", adminController.getAddProduct);

router.post("/admin/add-product", adminController.postAddProduct);

router.get("/admin/products", adminController.getProducts);

router.get('/admin/edit-product/:productId', adminController.getEditProduct)

router.post('/admin/edit-product', adminController.postEditProduct)

router.post('/admin/delete-product', adminController.postDeleteProduct)

module.exports = router;