const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(name, price, imgUrl, desc, id, userId) {
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    // save to database
    const db = getDb();
    let dbOp;

    if (this._id) {
      // update product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // create new product
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        // console.log("add product", this);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static fetchAllProducts() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({
        _id: new mongodb.ObjectId(prodId),
      })
      .next()
      .then((product) => {
        // console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) });
  }
}

module.exports = Product;
