const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

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
const csrfProtection = csrf();
app.use(flash());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("imgUrl")
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use(
  session({
    secret: "my secret", // Encrypts the session ID to prevent tampering.
    resave: false, // If true, the session will be saved to the store on every request, even if it wasn't modified. false -> sessions are only saved when they change.
    saveUninitialized: false, // true, a session will be created even if no data is stored. false -> Prevents creating empty sessions unless data is stored.
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 }, // session will expire after 1 hour
  })
);
app.use(csrfProtection);

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
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);
app.use(errorController.getError);
app.use((error, req, res, next) => {
  res.redirect("/500");
});

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
