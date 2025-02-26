// module.exports = function Product() {

// }

// const products = []

// module.exports = class Product {
//     constructor(name, price, desc) {
//         this.name = name
//         this.price = price
//         this.desc = desc
//     }

//     save() {
//         products.push(this)
//     }

//     static fetchAll() {
//         return products
//     }
// }


// store data in a file using model

const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(name, price, desc) {
    this.name = name;
    this.price = price;
    this.desc = desc;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
