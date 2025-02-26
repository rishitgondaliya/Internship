const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "views");

const users = [];

// set view engine
// pug
// app.set("view engine", "pug");

// express-handleBars
// app.engine(
//   "hbs",
//   exphbs.engine({
//     extname: "hbs",
//     defaultLayout: "main",
//     layoutsDir: path.join(__dirname, "views", "layouts"),
//   })
// );
// app.set('view engine', 'hbs') // express-handleBars

// ejs
app.set("view engine", "ejs"); // ejs

// set routes
// get routes
app.get("/", (req, res) => {
  res.render("index", { page_title: "Add User" });
});

app.get("/users", (req, res) => {
  // res.render("users", { page_title: "Users", users: users }); // pug
  // res.render("users", { page_title: "Users", users: users, hasUsers: users.length > 0 }); // handleBars
  res.render("users", { page_title: "Users", users: users });
});

// post routes
app.post("/add-user", (req, res) => {
  const user = req.body.userName;
  users.push(user);
  res.redirect("/users");
});

// start server
app.listen(3000);
console.log("server is running on http://localhost:3000");
