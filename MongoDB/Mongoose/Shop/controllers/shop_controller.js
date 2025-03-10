const Product = require("../models/product");
const Order = require("../models/order");

// get-products

exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.find()
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
    .populate("cart.items.productId") // Fetches full product details for each productId in the cart
    .then((user) => {
      const products = user.cart.items; // Extracts cart items from the populated user object
      // console.log(products)
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
      // console.log(result);
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
      console.log("item removed from cart");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("error while fetching cart", err);
    });
};

// get orders page
exports.getOrders = (req, res) => {
  Order.find({ "user.userId": req.user._id }) //finds orders of current userx
    .then((orders) => {
      // console.log(orders);
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
    // fetch user cart and populate product details
    const fetchCart = await req.user
      .populate("cart.items.productId")
      .then((user) => {
        const products = user.cart.items.map((i) => {
          return { quantity: i.quantity, product: { ...i.productId._doc } }; // ._doc is a special property in Mongoose, that spreads the document's fields into a new object.
        });

        // create a new order
        const order = new Order({
          products: products,
          user: {
            name: req.user.name,
            userId: req.user,
          },
        });
        order.save();
      });

    // clear cart
    await req.user.clearCart();
    console.log("order placed");
    res.redirect("/orders");
  } catch (err) {
    console.error("Error while creating order:", err);
    res.status(500).send("Something went wrong!");
  }
};
