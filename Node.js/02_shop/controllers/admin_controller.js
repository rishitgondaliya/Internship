const Product = require('../models/product')

// add-product controller

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
  });
};

exports.postAddProduct = (req, res) => {
  const {name, price, desc} = req.body
  const product = new Product(name, price, desc)
  product.save()
  res.redirect('/')
} 

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
    });  
  })
}