const Product = require('../models/product')

// get-products

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
    });  
  }) // using model
};

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
    });  
  })
}

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart'
  })
}

exports.getCheckout = (req, res) => {
  res.render('/shop/checkout', {
    pageTitle: 'Checkout'
  })
}