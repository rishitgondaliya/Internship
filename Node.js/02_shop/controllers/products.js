const Product = require('../models/product')

// add-product controller

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
  });
};

// const products = [];

// exports.postAddProduct = (req, res) => {
//   const { name, price, desc } = req.body;
//   products.push({ name, price, desc });
//   res.redirect("/");
// };

// using model
exports.postAddProduct = (req, res) => {
  const {name, price, desc} = req.body
  const product = new Product(name, price, desc)
  product.save()
  res.redirect('/')
} 

// get-products

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
    });  
  }) // using model
};
