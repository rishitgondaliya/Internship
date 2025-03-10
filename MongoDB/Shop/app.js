const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error404");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("67cad96be14de615b5f22e75")
    .then((user) => {
      // console.log(user)
      req.user = new User(user.userName, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

mongoConnect(() => {
  // console.log(getDb());
  app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
  });
});
