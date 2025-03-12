const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error404");
const User = require("./models/user");

dotenv.config();

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_DRIVER_URL,
  collection: "sessions",
});
const csrfProtection = csrf()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret", // It ensures that the session data is secure and prevents tampering
    resave: false, // If true, the session will be saved to the store on every request, even if it wasn't modified. false -> sessions are only saved when they change.
    saveUninitialized: false, // true, a session will be created even if no data is stored. false -> sessions are only created when something is stored in them,
    store: store,
  })
);
app.use(csrfProtection)

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

// app.use((req, res, next) => {
//   User.findById("67ca9bbf2d0bf9ca7b9d58e2")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// when using session
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.getError);

mongoose
  .connect(process.env.MONGO_DRIVER_URL)
  .then((result) => {
    console.log("Connected established.!");
    // we don't need to create user here because we have implemented authentication

    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Rishit", 
    //       email: "r@test.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save(); // save() -> rovided by default by mongoose
    //   }
    // });
    app.listen(3000, () => {
      console.log("server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log("error while connecting with database", err);
  });
