const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Product = require("../models/product");
const Order = require("../models/order");

const ITEMS_PER_PAGE = 3;

// get home page
exports.getIndex = (req, res) => {
  Product.find()
    .limit(3)
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      const error = new Error("Error while retriving data from the database");
      error.httpStatusCode = 500;
      return next(error);
    });
};

// get-products

exports.getProducts = (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Get page number, default is 1
  let totalProducts;

  Product.countDocuments()
    .then((numProducts) => {
      totalProducts = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE) // Skip previous products
        .limit(ITEMS_PER_PAGE); // Limit to ITEMS_PER_PAGE
    })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        currentPage: page,
        hasNextPage: page * ITEMS_PER_PAGE < totalProducts,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      console.error("Error while retrieving products:", err);
      const error = new Error("Error while retrieving data from the database");
      error.httpStatusCode = 500;
      return next(error);
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
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
      const error = new Error("Error while fetchin the cart");
      error.httpStatusCode = 500;
      return next(error);
    });
};

// get orders page
exports.getOrders = (req, res) => {
  Order.find({ "user.userId": req.session.user._id }) //finds orders of current userx
    .then((orders) => {
      // console.log(orders);
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// create order
exports.postOrder = async (req, res, next) => {
  try {
    // Fetch user cart and populate product details
    const user = await req.user.populate("cart.items.productId");

    const products = user.cart.items.map((i) => {
      return {
        quantity: i.quantity,
        product: { ...i.productId._doc }, // Extracts product details
        price: i.productId.price, // Store the product price at the time of order
      };
    });

    // Calculate total price
    const totalPrice = products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    // Create a new order
    const order = new Order({
      products: products,
      user: {
        name: req.user.name,
        userId: req.user,
      },
      totalPrice: totalPrice, // Save total price in order
    });

    await order.save();

    // Clear cart after order is placed
    await req.user.clearCart();
    console.log("Order placed successfully");

    res.redirect("/orders");
  } catch (err) {
    console.error("Error while creating order:", err);
    const error = new Error("Error while creating order");
    error.httpStatusCode = 500;
    return next(error);
  }
};

// get invoice

// exports.getInvoice = (req, res, next) => {
//   const orderId = req.params.orderId;
//   Order.findById(orderId).then((order) => {
//     if (!order) {
//       return next(new Error("Order not found"));
//     }
//     if (order.user.userId.toString() !== req.user._id.toString()) {
//       return next(new Error("Unauthorised!"));
//     }
//     const invoiceName = `Invoice-${orderId}.pdf`;
//     const invoicePath = path.join(
//       __dirname,
//       "..",
//       "data",
//       "invoices",
//       invoiceName
//     );

// this approach is ok for small files and less users
// Check if the file exists
// fs.readFile(invoicePath, (err, data) => {
//   if (err) {
//     return next(err);
//   }
// Stream the file instead of reading it into memory
//   res.setHeader("Content-Type", "application/pdf");

// to view the pdf
//   res.setHeader("Content-Disposition", `inline; filename="${invoiceName}"`);

// to download the pdf
// res.setHeader('Content-Disposition', `attachment; filename="${invoiceName}"`);

//   res.send(data)
// });

// to read bigger files and handle multiple users -> create read stream
//     const readStream = fs.createReadStream(invoicePath);
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `inline; filename="${invoiceName}"`);

//     readStream.pipe(res)
//   });
// };

exports.getInvoice = async (req, res, next) => {
  try {
    let orderId = req.params.orderId;
    console.log("Requested Order ID:", orderId);

    // Remove ".pdf" if mistakenly included
    if (orderId.endsWith(".pdf")) {
      orderId = orderId.replace(".pdf", "");
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    // Find the order in the database
    const order = await Order.findById(orderId).populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Define the invoice path
    const invoiceName = `Invoice-${orderId}.pdf`;
    const invoicePath = path.join(
      __dirname,
      "..",
      "data",
      "invoices",
      invoiceName
    );

    // Set response headers for PDF streaming
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${invoiceName}"`);

    // Create a new PDF document
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(invoicePath)); // Save the PDF to the file system
    pdfDoc.pipe(res); // Send the PDF directly to the client

    // Add invoice content
    pdfDoc.fontSize(24).text("Invoice", { underline: true });
    pdfDoc.text("----------------------------");
    pdfDoc.fontSize(14).text(`Order ID: ${orderId}`);
    pdfDoc
      .fontSize(12)
      .text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
    pdfDoc.text("----------------------------");

    pdfDoc.fontSize(14).text("Item Details");
    pdfDoc.text("----------------------------");
    order.products.forEach((prod) => {
      pdfDoc
        .fontSize(14)
        .text(
          `${prod.product.name} - ${prod.quantity} x $${prod.product.price}`
        );
    });

    pdfDoc.text("----------------------------");
    pdfDoc.fontSize(16).text(`Total Price: $${order.totalPrice}`);

    // End the PDF stream (This must be the last step!)
    pdfDoc.end();
  } catch (err) {
    console.error("Error fetching invoice:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCheckOut = (req, res, next) => {
  let products;
  let total = 0;

  req.user
    .populate("cart.items.productId")
    .then((user) => {
      products = user.cart.items;
      products.forEach((p) => {
        total += p.quantity * p.productId.price;
      });

      return stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: products.map((p) => ({
          price_data: {
            currency: "inr",
            product_data: {
              name: p.productId.name,
              description: p.productId.desc,
            },
            unit_amount: p.productId.price * 100, // Amount must be in paise (multiply by 100)
          },
          quantity: p.quantity,
        })),
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/checkout/success`, // http://localhost/checkout/success
        cancel_url: `${req.protocol}://${req.get("host")}/checkout/cancel`,
      });
    })
    .then((session) => {
      res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
        products: products,
        totalAmount: total,
        sessionId: session.id, // This must be used in EJS
      });
    })
    .catch((err) => {
      console.error("Error creating checkout session:", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
