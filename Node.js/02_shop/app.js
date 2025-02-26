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

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require('./controllers/error404')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ejs
app.set("view engine", "ejs");

app.set("views", "views");

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

app.listen(3000);