const Product = require("../models/product");

// add-product controller

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEditing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { name, imgUrl, price, desc } = req.body;
  const product = new Product(null, name, imgUrl, price, desc);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.getEditProduct = (req, res) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(prodId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      isEditing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;
  const updatedProduct = new Product(
    prodId,
    updatedName,
    updatedPrice,
    updatedImgUrl,
    updatedDesc
  );
  updatedProduct.save();
};
