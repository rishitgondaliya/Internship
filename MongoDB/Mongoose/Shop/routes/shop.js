const express = require("express");

const shopController = require("../controllers/shop_controller");
const isAuth = require('../middleware/is_auth')

const app = express();

app.get("/", shopController.getIndex);

app.get('/products', shopController.getProducts)

app.get('/products/:productId', shopController.getProduct)

app.get('/cart', isAuth, shopController.getCart)

app.post('/cart', isAuth, shopController.postCart)

app.post('/delete-cart-item', isAuth, shopController.postDeleteCartItem)

app.get('/orders', isAuth, shopController.getOrders)

app.post('/create-order', isAuth, shopController.postOrder)

module.exports = app;