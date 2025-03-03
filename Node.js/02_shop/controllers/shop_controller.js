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

const Product = require("../models/product");
const Cart = require("../models/cart");

// get-products

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get single product datail
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([product]) => {
    res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].name,
        path: "/products",
    })
  })
  .catch((err) => console.log(err));
};

// get home page
exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get cart page
exports.getCart = (req, res) => {
  Cart.getCartProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

// add to cart
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

// delete a product from cart
exports.postDeleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

// get orders page
exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

// checkout page
exports.getCheckout = (req, res) => {
  res.render("/shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
