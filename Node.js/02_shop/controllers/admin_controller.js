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

const Product = require("../models/product");

// ------ using MySQL database -------

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
  const product = new Product(null, name, price, imgUrl, desc);
  product.save()
    .then(() => {
      console.log("Product inserted successfully!")
      res.redirect('/')
    })
    .catch((err) => console.error("Error inserting product:", err));
};

// exports.postAddProduct = async (req, res) => {
//   try {
//     const { name, price, imgUrl, desc } = req.body;

//     const parsedPrice = parseFloat(price);
//     if (isNaN(parsedPrice) || parsedPrice <= 0) {
//       console.error("Invalid price value:", price);
//       return res.status(400).send("Invalid price. Please enter a valid number.");
//     }

//     console.log(typeof parsedPrice); // Should log 'number'

//     const product = new Product(null, name, imgUrl, parsedPrice, desc);

//     console.log("Saving product...");
//     await product.save();

//     console.log("Product inserted successfully!");
//     res.redirect('/');
//   } catch (err) {
//     console.error("Error inserting product:", err);
//     res.status(500).send("Failed to save product.");
//   }
// };


// get list of all products
exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
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

// update product and post updated data
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;
  const updatedProduct = new Product(
    prodId,
    updatedName,
    updatedImgUrl,
    updatedPrice,
    updatedDesc
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

// delete product
exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteProductById(prodId);
  res.redirect("/admin/products");
};
