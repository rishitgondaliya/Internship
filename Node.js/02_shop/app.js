// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// const handleBar = require("express-handlebars");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

// const app = express();
// const router = express.Router() // will work exactly same ass app

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// hbs
// app.engine(
//     "hbs",
//     handleBar.engine({
//       extname: "hbs",
//       defaultLayout: "main", // Uses main.hbs as the default layout
//       layoutsDir: path.join(__dirname, "views", "layouts"), // Folder for layout files
//     })
//   );
// app.set('view engine', 'hbs')

// pug
// app.set('view engine', 'pug') // set view engine

// ejs
// app.set("view engine", "ejs");

// app.set("views", "views");

// app.use((req, res, next) => {
//     console.log('In the middleware!')
//     next() // call the next middleware
// })

// app.use(adminRoutes.routes);
// app.use(shopRoutes);

// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
//   res.status(404).render("404", { pageTitle: "Page not found" });
// });

// app.listen(3000); //satrt the server

// *************** Using controller *****************

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// using MySQL database
// without sequelize
// const db = require("./util/database");

// using sequelize
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error404");
const { name } = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

// using MySQL database
// db.execute("SELECT * FROM products")
//     .then(result => {
//         console.log("data fetched successfully")
//     })
//     .catch(err => {
//         console.log(err)
//     });

app.use((req, res, next) => {
  User.findOne({ where: { id: 1 } })
    .then((user) => {
      req.user = user; // storing sequelize objectt in request body
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

/* 
sequelize.sync() is a Sequelize method that synchronizes your models with the database. 
It ensures that the tables in the database match your defined Sequelize models.

Creates Tables:- If a table doesn't exist for a model, sync() creates it.
Does Nothing If Table Exists:- If the table already exists and has the same structure, it remains unchanged.
Does NOT Modify Existing Schema:- By default, it does not modify columns or remove existing tables.

*/

// A Product belongs to a User (Each product is created by a specific user)
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// This adds a `userId` foreign key column in the `products` table referencing `users(id)`.
// `onDelete: "CASCADE"` ensures that if a user is deleted, all their products are also deleted.

// A User can have multiple Products (One-to-Many Relationship)
User.hasMany(Product);
// This means that a single user can have multiple products.
// The `products` table will reference the `userId` field from the `users` table.

// A User has one Cart (One-to-One Relationship)
User.hasOne(Cart);
// This means that each user has a single cart associated with them.
// A `userId` column will be added to the `carts` table.

// A Cart belongs to a User (Optional, already defined above)
Cart.belongsTo(User);
// This defines the inverse relationship, meaning that each cart is linked to a single user.
// The `carts` table will contain a `userId` foreign key referencing `users(id)`.

// A Cart can have multiple Products (Many-to-Many Relationship)
Cart.belongsToMany(Product, { through: CartItem });
// This creates a many-to-many relationship using a junction table `cartItem`.
// Each cart can contain multiple products, and a product can belong to multiple carts.

// A Product can belong to multiple Carts (Many-to-Many Relationship)
Product.belongsToMany(Cart, { through: CartItem });
// This is the inverse relation of the above, linking products to multiple carts through `cart_products`.
// The `cartItem` table will have `cartId` and `productId` as foreign keys.

// An Order belongs to a User (Each order is placed by a specific user)
Order.belongsTo(User);
// This means that each order is associated with a single user.
// A `userId` foreign key column will be added to the `orders` table referencing `users(id)`.

// A User can have multiple Orders (One-to-Many Relationship)
User.hasMany(Order);
// This means that a single user can place multiple orders.
// The `orders` table will reference the `userId` field from the `users` table.

// An Order can have multiple Products, and a Product can be in multiple Orders (Many-to-Many Relationship)
Order.belongsToMany(Product, { through: OrderItem });
// This creates a many-to-many relationship between `orders` and `products` using a junction table `orderItem`.
// The `orderItem` table will have `orderId` and `productId` as foreign keys.

sequelize
  // .sync({force: true})  // will drop existing and creates new table
  .sync()
  .then((result) => {
    return User.findOne({ where: { id: 1 } });
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Rishit",
        email: "r@test.com",
      });
    }

    return user;
  })
  .then((user) => {
    user.createCart();
  })
  .then((cart) => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
