const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const { validationResult } = require("express-validator");

// get add product page
exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isEditing: false,
    oldInput: {},
    errorMsg: null,
    validationResult: [],
  });
};

// post product data

exports.postAddProduct = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, price, desc } = req.body;
  const imgUrl = req.file;
  console.log(imgUrl);

  if (!imgUrl) {
    return res.status(422).render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      isEditing: false,
      oldInput: { name, price, desc },
      errorMsg:
        "File type not supported! Please upload only .jpg/.png/.jpeg file.",
      validationResult: [{ path: "imgUrl" }],
    });
  }
  try {
    if (!errors.isEmpty()) {
      // console.log("errors", errors.array())
      return res.status(422).render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        isEditing: false,
        oldInput: { name, price, desc },
        errorMsg: errors.array()[0].msg,
        validationResult: errors.array(),
      });
    }

    const image = imgUrl.path;

    const product = new Product({
      name: name,
      price: price,
      imgUrl: image,
      desc: desc,
      userId: req.user._id, // user who created product
    });

    await product.save(); // mongoose provides save() method by default

    console.log("Product added successfully:");
    res.redirect("/admin/products");
  } catch (err) {
    // return res.status(500).render("admin/add-product", {
    //   pageTitle: "Add Product",
    //   path: "/admin/add-product",
    //   isEditing: false,
    //   oldInput: { name, price, imgUrl, desc },
    //   errorMsg: "Error while adding product, please try again.!",
    //   validationResult: [],
    // });

    // res.redirect('/500')
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// get list of all products
exports.getProducts = (req, res) => {
  Product.find({ userId: req.user._id })
    // .select('name price -_id') // selects specific fields / Selects only 'name' and 'price', excluding '_id'
    // .populate('userId name') // Populates 'userId' field with referenced user data
    .then((products) => {
      // console.log(products)
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(
        "Error while retriving products data from database"
      );
      error.httpStatusCode = 500;
      return next(error);
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
      res.status(422).render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        isEditing: editMode,
        product: product,
        errorMsg: null,
        validationResult: [],
      });
    })
    .catch((err) => {
      const error = new Error("Error editing the product.!");
      error.httpStatusCode = 500;
      return next(error);
    });
};

// update product and post updated data
exports.postEditProduct = async (req, res) => {
  const errors = validationResult(req);
  try {
    const prodId = req.body.productId;
    const { updatedName, updatedPrice, updatedImgUrl, updatedDesc } = req.body;

    if (!errors.isEmpty()) {
      console.log("errors", errors.array());
      return res.status(422).render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        isEditing: true,
        product: {
          name: updatedName,
          price: updatedPrice,
          imgUrl: updatedImgUrl,
          desc: updatedDesc,
          _id: prodId,
        },
        errorMsg: errors.array()[0].msg,
        validationResult: errors.array(),
      });
    }
    
    const updatedFields = {
      name: updatedName,
      price: updatedPrice,
      desc: updatedDesc
    }

    if(req.file) {
      updatedFields.imgUrl = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      prodId,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      console.log("Product not found.");
      return res.redirect("/admin/products");
    }

    console.log("Product details updated successfully.");
    res.redirect("/admin/products");
  } catch (err) {
    const error = new Error("Error while updating the product details");
    error.httpStatusCode = 500;
    return next(error);
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
        const error = new Error("Error while deleting the product");
        error.httpStatusCode = 500;
        return next(error);
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
        const error = new Error("Error while deleting the product");
        error.httpStatusCode = 500;
        return next(error);
      });
  }
};
