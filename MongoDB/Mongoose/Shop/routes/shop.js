const express = require("express");
const path = require("path");

const shopController = require("../controllers/shop_controller");

const app = express();

app.get("/", shopController.getIndex);

app.get('/products', shopController.getProducts)

app.get('/products/:productId', shopController.getProduct)

app.get('/cart', shopController.getCart)

app.post('/cart', shopController.postCart)

app.post('/delete-cart-item', shopController.postDeleteCartItem)

app.get('/orders', shopController.getOrders)

app.post('/create-order', shopController.postOrder)

module.exports = app;