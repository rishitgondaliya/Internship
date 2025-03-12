const express = require("express");

const adminController = require("../controllers/admin_controller");
const isAuth = require('../middleware/is_auth')

const router = express.Router();

// controllers will be executed from left to right
router.get("/admin/add-product", isAuth, adminController.getAddProduct);

router.post("/admin/add-product", isAuth, adminController.postAddProduct);

router.get("/admin/products", isAuth, adminController.getProducts);

router.get('/admin/edit-product/:productId', isAuth, adminController.getEditProduct)

router.post('/admin/edit-product', isAuth, adminController.postEditProduct)

router.post('/admin/delete-product', isAuth, adminController.postDeleteProduct)

module.exports = router;