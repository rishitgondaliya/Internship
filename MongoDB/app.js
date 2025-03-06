const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./Shop/routes/admin");
const shopRoutes = require("./Shop/routes/shop");
const errorController = require("./Shop/controllers/error404");
const mongoConnect = require("./Shop/util/database").mongoConnect;
const User = require("./Shop/models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("67c83a44a112e80474f289df")
    .then((user) => {
      req.user = new User(user.userName, user.email, user._id);
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
