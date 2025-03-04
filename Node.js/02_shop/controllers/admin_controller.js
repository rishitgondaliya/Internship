// const Product = require("../models/product");

// // --- Add-product controller ----

// // get add product page
// exports.getAddProduct = (req, res) => {
//   res.render("admin/add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     isEditing: false,
//   });
// };

// // post product data
// exports.postAddProduct = (req, res) => {
//   const { name, imgUrl, price, desc } = req.body;
//   const product = new Product(null, name, imgUrl, price, desc);
//   product.save();
//   res.redirect("/products");
// };

// // get list of all products
// exports.getProducts = (req, res) => {
//   Product.fetchAll((products) => {
//     res.render("admin/products", {
//       prods: products,
//       pageTitle: "Admin Products",
//       path: "/admin/products",
//     });
//   });
// };

// // ---- edit product ----

// // get edit product page
// exports.getEditProduct = (req, res) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/admin/edit-product");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     if (!product) {
//       res.redirect("/");
//     }
//     res.render("admin/edit-product", {
//       pageTitle: "Edit Product",
//       path: "/admin/edit-product",
//       isEditing: editMode,
//       product: product,
//     });
//   });
// };

// // update product and post updated data
// exports.postEditProduct = (req, res) => {
//   const prodId = req.body.productId;
//   const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;
//   const updatedProduct = new Product(
//     prodId,
//     updatedName,
//     updatedImgUrl,
//     updatedPrice,
//     updatedDesc
//   );
//   updatedProduct.save();
//   res.redirect('/admin/products')
// };

// // delete product
// exports.postDeleteProduct = (req, res) => {
//   const prodId = req.body.productId
//   Product.deleteProductById(prodId)
//   res.redirect('/admin/products')
// }

// const Product = require("../models/product");

// // ------ using MySQL database -------

// // get add product page
// exports.getAddProduct = (req, res) => {
//   res.render("admin/add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     isEditing: false,
//   });
// };

// // post product data
// exports.postAddProduct = (req, res) => {
//   const { name, price, imgUrl, desc } = req.body;
//   const product = new Product(null, name, price, imgUrl, desc);
//   product.save()
//     .then(() => {
//       console.log("Product inserted successfully!")
//       res.redirect('/')
//     })
//     .catch((err) => console.error("Error inserting product:", err));
// };

// // get list of all products
// exports.getProducts = (req, res) => {
//   Product.fetchAll((products) => {
//     res.render("admin/products", {
//       prods: products,
//       pageTitle: "Admin Products",
//       path: "/admin/products",
//     });
//   });
// };

// // ---- edit product ----

// // get edit product page
// exports.getEditProduct = (req, res) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/admin/edit-product");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     if (!product) {
//       res.redirect("/");
//     }
//     res.render("admin/edit-product", {
//       pageTitle: "Edit Product",
//       path: "/admin/edit-product",
//       isEditing: editMode,
//       product: product,
//     });
//   });
// };

// // update product and post updated data
// exports.postEditProduct = (req, res) => {
//   const prodId = req.body.productId;
//   const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;
//   const updatedProduct = new Product(
//     prodId,
//     updatedName,
//     updatedImgUrl,
//     updatedPrice,
//     updatedDesc
//   );
//   updatedProduct.save();
//   res.redirect("/admin/products");
// };

// // delete product
// exports.postDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.deleteProductById(prodId);
//   res.redirect("/admin/products");
// };

// ------ using Sequelize -------

const { where } = require("sequelize");
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
  // Product.create({
  //   name: name,
  //   price: price,
  //   imgUrl: imgUrl,
  //   desc: desc,
  //   userId: req.user.id
  // })
  req.user
    .createProduct({
      // sequelize automatically adds this method we can use that
      name: name,
      price: price,
      imgUrl: imgUrl,
      desc: desc,
    })
    .then((result) => {
      console.log("Product added successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("An error occured while adding product", err);
    });
};

// get list of all products
exports.getProducts = (req, res) => {
  // Product.findAll()
  req.user
    .getProducts()
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
  // Product.findOne({ where: { id: prodId } })
  req.user
    .getProducts({ where: { id: prodId } }) // will return an array
    .then((products) => {
      const product = products[0];
      if (!product) {
        res.redirect("/");
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
  Product.findOne({ where: { id: prodId } })
    .then((product) => {
      product.name = updatedName;
      product.price = updatedPrice;
      product.imgUrl = updatedImgUrl;
      product.desc = updatedDesc;
      return product.save();
    })
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
  // Product.destroy({where: {id: prodId}})
  Product.findOne({ where: { id: prodId } })
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Product deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Eroor while deleting the product", err);
    });
};
