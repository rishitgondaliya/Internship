// const express = require("express");
// const path = require("path");
// const routeDir = require("../util/path");
// const adminData = require("./admin");

// const app = express();

// app.get("/", (req, res, next) => {
//   console.log(adminData.products)
//   res.sendFile(path.join(routeDir, 'views', 'shop.html')) // send response

//   const products = adminData.products;
//   res.render("shop", { prods: products, pageTitle: "Shop" }); // pug file
// });

// module.exports = app;

// ************** Using controllers ***************

const express = require("express");
const path = require("path");

const shopController = require("../controllers/shop_controller");

const app = express();

app.get("/", shopController.getIndex);

app.get('/products', shopController.getProducts)

app.get('/products/delete')

app.get('/products/:productId', shopController.getProduct)

app.get('/cart', shopController.getCart)

app.post('/cart', shopController.postCart)

app.post('/delete-cart-item', shopController.postDeleteCartItem)

app.get('/orders', shopController.getOrders)

app.get('/checkout', shopController.getCheckout)

module.exports = app;