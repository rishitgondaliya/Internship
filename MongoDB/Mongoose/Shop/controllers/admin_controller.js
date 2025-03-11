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

exports.postAddProduct = async (req, res) => {
  try {
    const { name, price, imgUrl, desc } = req.body;

    const product = new Product({
      name: name,
      price: price,
      imgUrl: imgUrl,
      desc: desc,
      userId: req.user._id, // user who created product
    });

    await product.save();  // mongoose provides save() method by default

    console.log("Product added successfully:");
    res.redirect("/admin/products");
  } catch (err) {
    console.error("An error occurred while adding product:", err);
    res.status(500).send("Internal Server Error");
  }
};

// get list of all products
exports.getProducts = (req, res) => {
  Product.find()
    // .select('name price -_id') // selects specific fields / Selects only 'name' and 'price', excluding '_id'
    // .populate('userId name') // Populates 'userId' field with referenced user data
    .then((products) => {
      // console.log(products)
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.isLoggedIn
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
  Product.findById(prodId) // mongoose by default have findById() method
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        isEditing: editMode,
        product: product,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log("Error while editing product", err);
    });
};

// update product and post updated data
exports.postEditProduct = async (req, res) => {
  try {
    const prodId = req.body.productId;
    const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        name: updatedName,
        price: updatedPrice,
        imgUrl: updatedImgUrl,
        desc: updatedDesc,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      console.log("Product not found.");
      return res.redirect("/admin/products");
    }

    console.log("Product details updated successfully.");
    res.redirect("/admin/products");
  } catch (err) {
    console.log("Error while updating product details", err);
  }
};

// delete product
exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;

  // Check if the product exists in the user's cart
  if (
    req.user.cart.items.some(
      //  returns true if at least one item matches the condition.
      (p) => p.productId.toString() === prodId.toString()
    )
  ) {
    req.user
      .deleteCartItem(prodId) // remove from the cart
      .then(() => {
        Product.findByIdAndDelete(prodId); // delete from database
      })
      .then(() => {
        console.log("Product deleted successfully");
        res.redirect("/admin/products");
      })
      .catch((err) => {
        console.log("Eroor while deleting the product", err);
      });
  } else {
    // If product is not in the cart, directly delete it from the database
    Product.findByIdAndDelete(prodId)
      // .deleteOne()
      .then((result) => {
        console.log("Product deleted successfully");
        res.redirect("/admin/products");
      })
      .catch((err) => {
        console.log("Eroor while deleting the product", err);
      });
  }
};
