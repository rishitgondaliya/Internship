const Product = require("../models/product");

// get add product page
exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEditing: false,
  });
};

// post product data
exports.postAddProduct = (req, res) => {
  const { name, price, imgUrl, desc } = req.body;
  const product = new Product(name, price, imgUrl, desc, null, req.user._id);
  product
    .save()
    .then((result) => {
      console.log(result);
      console.log("Product added successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("An error occured while adding product", err);
    });
};

// get list of all products
exports.getProducts = (req, res) => {
  Product.fetchAllProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log("Error while retriving data from database", err);
    });
};

// ---- edit product ----

// get edit product page
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/admin/edit-product");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        isEditing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log("Error while editing product", err);
    });
};

// update product and post updated data
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;
  const product = new Product(
    updatedName,
    updatedPrice,
    updatedImgUrl,
    updatedDesc,
    prodId
  );
  product
    .save()
    .then((result) => {
      console.log("Product details updated successfully.");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Error while updating product details", err);
    });
};

// delete product
exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then((result) => {
      console.log("Product deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Eroor while deleting the product", err);
    });
};
