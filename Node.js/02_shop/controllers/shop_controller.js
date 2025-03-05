// const Product = require('../models/product')
// const Cart = require('../models/cart')

// // get-products

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: '/products'
//     });
//   }) // using model
// };

// // get single product datail
// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId
//   Product.findById(prodId, product => {
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.name,
//       path:'/products'
//     })
//   })
//   // res.redirect('/')
// };

// // get home page
// exports.getIndex = (req, res) => {
//   Product.fetchAll(products => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "Shop",
//       path: '/'
//     });
//   })
// }

// // get cart page
// exports.getCart = (req, res) => {
//   Cart.getCartProducts(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = []
//       for(product of products){
//         const cartProductData = cart.products.find(prod => prod.id === product.id)
//         if(cartProductData) {
//           cartProducts.push({productData: product, qty: cartProductData.qty})
//         }
//       }
//       res.render('shop/cart', {
//         pageTitle: 'Your Cart',
//         path: '/cart',
//         products: cartProducts
//       })
//     })
//   })
// }

// // add to cart
// exports.postCart = (req, res) => {
//   const prodId = req.body.productId
//   Product.findById(prodId, product => {
//     Cart.addProduct(prodId, product.price)
//   })
//   res.redirect('/cart')
// }

// // delete a product from cart
// exports.postDeleteCartItem = (req, res) => {
//   const prodId = req.body.productId
//   Product.findById(prodId, product => {
//     Cart.deleteProduct(prodId, product.price)
//     res.redirect('/cart')
//   })
// }

// // get orders page
// exports.getOrders = (req, res) => {
//   res.render('shop/orders', {
//     pageTitle: 'Your Orders',
//     path: '/orders'
//   })
// }

// // checkout page
// exports.getCheckout = (req, res) => {
//   res.render('/shop/checkout', {
//     pageTitle: 'Checkout',
//     path: '/checkout'
//   })
// }

// ---------Using MySQL database---------

// const Product = require("../models/product");
// const Cart = require("../models/cart");

// // get-products

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render("shop/product-list", {
//         prods: rows,
//         pageTitle: "All products",
//         path: "/products",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // get single product datail
// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//   .then(([product]) => {
//     res.render("shop/product-detail", {
//         product: product[0],
//         pageTitle: product[0].name,
//         path: "/products",
//     })
//   })
//   .catch((err) => console.log(err));
// };

// // get home page
// exports.getIndex = (req, res) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render("shop/index", {
//         prods: rows,
//         pageTitle: "Shop",
//         path: "/",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// ----------- Using Sequelize ------------

const Product = require("../models/product");

// get-products

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  // Product.findByPk(prodId) // find by primary key

  // Product.findAll() // returns an array
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: product[0].name,
  //       path: "/products",
  //     });
  //   });

  Product.findOne({ where: { id: prodId } })
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
  Product.findAll()
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
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// add to cart
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQty = product.cartItem.quantity;
        newQuantity = oldQty + 1;
        return product;
      }
      return Product.findOne({ where: { id: prodId } });
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    });
};

// delete a product from cart
exports.postDeleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("error while fetching cart", err);
    });
};

// get orders page
exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
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
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    const order = await req.user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );

    await cart.setProducts(null);

    res.redirect("/orders");
  } catch (err) {
    console.error("Error while creating order:", err);
    res.status(500).send("Something went wrong!");
  }
};

// exports.postOrder = (req, res) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .then((result) => {
//       fetchedCart.setProducts(null);
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };


// delete a product from order
// exports.postDeleteOrderItem = async (req, res) => {
//   try {
//     const prodId = req.body.productId;

//     // Find the user's orders that contain the given product
//     const orders = await req.user.getOrders({
//       include: [{ model: Product, where: { id: prodId } }]
//     });

//     if (!orders.length) {
//       console.log("No matching order found for product:", prodId);
//       return res.redirect("/orders");
//     }

//     for (let order of orders) {
//       const products = await order.getProducts({ where: { id: prodId } });

//       if (products.length > 0) {
//         // Delete the order item entry from 'order-items' table
//         await order.removeProduct(products[0]); 

//         // Check if there are remaining products in this order
//         const remainingProducts = await order.getProducts();
//         if (remainingProducts.length === 0) {
//           await order.destroy(); // Delete order if no products remain
//         }
//       }
//     }

//     res.redirect("/orders"); // Redirect after deletion
//   } catch (err) {
//     console.error("Error while canceling order:", err);
//     res.status(500).send("Error while canceling order");
//   }
// };


// checkout page
exports.getCheckout = (req, res) => {
  res.render("/shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
