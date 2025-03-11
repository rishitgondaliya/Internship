const User = require("../models/user");

exports.getLogin = (req, res) => {
  //   const isLoggedIn = req.get("Cookie");
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res) => {
  //   req.isLoggedIn = true;
  //   res.setHeader("Set-Cookie", "isLoggedIn = true; httpOnly"); // set cookie
  User.findById("67ca9bbf2d0bf9ca7b9d58e2")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    // res.clearCookie('isLoggedIn');
    res.redirect("/");
  });
};
