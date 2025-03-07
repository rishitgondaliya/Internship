const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(name, price, imgUrl, desc, id, userId) {
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this._id = id ? new mongodb.ObjectId(id) : null; // set product id
    this.userId = userId; // userId who created the product
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

  // static fetchAllProducts() {
  //   const db = getDb();
  //   return db
  //     .collection("products")
  //     .find()
  //     .toArray()
  //     .then((products) => {
  //       // console.log(products);
  //       return products;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  static async fetchAllProducts() {
    try {
      const db = getDb();
      return await db.collection("products").find().toArray();
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  }

  static findById(prodId) {
    const db = getDb();
    return (
      db
        .collection("products")
        .findOne({
          _id: new mongodb.ObjectId(prodId),
        })

        // .find({ // find() -> returns a cursor -> is a pointer to the documents -> can be iterated
        //   _id: new mongodb.ObjectId(prodId),
        // })
        // .next() // returns the first document

        .then((product) => {
          // console.log(product);
          return product;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) });
  }
}

module.exports = Product;
