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

// ----------store data in a file using model---------

// const fs = require("fs");
// const path = require("path");

// const Cart = require("./cart");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// // retrive product details from local file
// const getProductsFromFile = (callback) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       callback([]);
//     }
//     callback(JSON.parse(fileContent));
//   });
// };

// module.exports = class Product {
//   constructor(id, name, imgUrl, price, desc) {
//     this.id = id;
//     this.name = name;
//     this.imgUrl = imgUrl;
//     this.price = price;
//     this.desc = desc;
//   }

//   // save product to local file storage
//   save() {
//     getProductsFromFile((products) => {
//       // save existing product
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           (prod) => prod.id === this.id
//         );
//         const updatedProducts = [...products];
//         updatedProducts[existingProductIndex] = this;
//         console.log("updated details", this);
//         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//           console.log(err);
//         });
//       } else {
//         // save new product
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   // fetch all product's detail
//   static fetchAll(callback) {
//     getProductsFromFile(callback);
//   }

//   // find single product using product id
//   static findById(id, cb) {
//     getProductsFromFile((products) => {
//       const product = products.find((p) => p.id === id);
//       cb(product);
//     });
//   }

//   // delete product
//   static deleteProductById(id) {
//     getProductsFromFile((products) => {
//       const product = products.find((p) => p.id === id);
//       const updatedProducts = products.filter((prod) => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }
// };

// -----------Using MySQL database-----------

// const db = require("../util/database");

// module.exports = class Product {
//   constructor(id, name, price, imgUrl, desc) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.imgUrl = imgUrl;
//     this.desc = desc;
//   }

//   // save product to MySQL database

//   save() {
//     return db.execute(
//       "INSERT INTO products (name, price, imgUrl, `desc`) VALUES (?, ?, ?, ?)",
//       [this.name, this.price, this.imgUrl, this.desc]
//     );
//   }

//   // fetch all product's detail
//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   // find single product using product id
//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?',[id])
//   }
// };


// --------- using Sequelize ----------

const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Product = sequelize.define('product', {  //model name, table schema(columns)
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product