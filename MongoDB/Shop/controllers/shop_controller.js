const db = require("../util/database").getDb;
const Product = require("../models/product");

// get-products

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("Error while retriving products from database", err);
    });
};

// get single product datail
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.name,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

// get home page
exports.getIndex = (req, res) => {
  Product.fetchAllProducts()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log("Error while retriving data from database", err);
    });
};

// get cart page
exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// add to cart
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete a product from cart
exports.postDeleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .deleteCartItem(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("error while fetching cart", err);
    });
};

// get orders page
exports.getOrders = (req, res) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// create order
exports.postOrder = async (req, res) => {
  try {
    const order = await req.user.addOrder();

    res.redirect("/orders");
  } catch (err) {
    console.error("Error while creating order:", err);
    res.status(500).send("Something went wrong!");
  }
};
