const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign Up",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        // return res.status(422).json({message: 'Email already exists.'})
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getLogin = (req, res) => {
  // const isLoggedIn = req.get("Cookie");
  // console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    // csrfToken: req.csrfToken()
  });
};

exports.postLogin = (req, res) => {
  //   req.isLoggedIn = true;
  //   res.setHeader("Set-Cookie", "isLoggedIn = true; httpOnly"); // set cookie
  // User.findById("67ca9bbf2d0bf9ca7b9d58e2")
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.redirect("/login");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};
