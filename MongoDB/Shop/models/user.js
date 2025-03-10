const getDb = require("../util/database").getDb;
const { ObjectId } = require("mongodb");

class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  // save user to the database
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  // add product to the cart
  addToCart(product) {
    // find the index if product is already in the cart
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      // increase quantity of existing product
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      // add new product to the cart
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    // update the cart in the database => new cart object with the updated items.
    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    // array of productId in cart
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });

    // find products in database
    return (
      db
        .collection("products")
        .find({
          _id: { $in: productIds },
        })
        .toArray()
        // attach quantity to each product
        .then((products) => {
          return products.map((p) => {
            return {
              ...p,
              quantity:
                this.cart.items.find((i) => {
                  // items in cart
                  return i.productId.toString() === p._id.toString(); // find item with same product id
                })?.quantity || 0,
            };
          });
        })
        .catch((err) => {
          console.log("error while fetching cart", err);
        })
    );
  }

  deleteCartItem(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();

    // get user's cart products
    return (
      this.getCart()
        .then((products) => {
          // create order document
          const order = {
            items: products,
            user: {
              _id: new ObjectId(this._id),
              name: this.name,
              email: this.email,
            },
          };

          // store order in database
          return db.collection("orders").insertOne(order);
        })
        // clear the cart after placing an order
        .then((result) => {
          this.cart = { items: [] };
          return db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: { items: [] } } }
            );
        })
    );
  }

  // get orders into view
  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({
        "user._id": new ObjectId(this._id),
      })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      // .next();
  }
}

module.exports = User;
