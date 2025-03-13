const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res) => {
  let message = req.flash("error")[0] || null;
  const formData = req.session.formData || {};
  delete req.session.formData;

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign Up",
    errorMsg: message,
    oldInput: formData,
    // isAuthenticated: false,
  });
};

exports.postSignup = (req, res) => {
  const { name, email, password } = req.body;
  if (name === "") {
    req.flash("error", "Name is required!");
    req.session.formData = { email };
    return res.redirect("/signup");
  } else if (email === "") {
    req.flash("error", "Email is required!");
    req.session.formData = { name };
    return res.redirect("/signup");
  } else if (password === "") {
    req.flash("error", "Password is required!");
    req.session.formData = { name, email };
    return res.redirect("/signup");
  } else if (password.length < 8) {
    req.flash("error", "Password must be at least 8 characters long!");
    req.session.formData = { name, email };
    return res.redirect("/signup");
  } else if (email === password) {
    req.flash("error", "Password and email cannot be the same!");
    req.session.formData = { name, email };
    return res.redirect("/signup");
  } else if (name === password) {
    req.flash("error", "Password and name cannot be the same!");
    req.session.formData = { name, email };
    return res.redirect("/signup");
  } else if (name === "" && email === "" && password === "") {
    req.flash("error", "All the fields are required!");
    return res.redirect("/signup");
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "Email already exists! Please use a different email."
        );
        req.session.formData = { name };
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
  let message = req.flash("error")[0] || null;
  // let successMsg = req.flash("success")[0] || null;
  const formData = req.session.formData || {};
  delete req.session.formData;

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: false,
    // csrfToken: req.csrfToken(),
    errorMsg: message,
    // successMsg: successMsg,
    oldInput: formData,
  });
};

exports.postLogin = (req, res) => {
  //   req.isLoggedIn = true;
  //   res.setHeader("Set-Cookie", "isLoggedIn = true; httpOnly"); // set cookie
  // User.findById("67ca9bbf2d0bf9ca7b9d58e2")
  const { email, password } = req.body;
  if (email === "") {
    req.flash("error", "Please enter email!");
    return res.redirect("/login");
  } else if (password === "") {
    req.flash("error", "Please enter password!");
    req.session.formData = { email };
    return res.redirect("/login");
  } else if (email === "" && password === "") {
    req.flash("error", "Please enter email and password!");
    return res.redirect("/login");
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Provide a valid email!");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          req.flash("error", "Incorrect password !!");
          req.session.formData = { email };
          return res.redirect("/login");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          // req.flash("success", "Login successful! Welcome back.");
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
    res.clearCookie("connect.sid");
    // req.flash("success", "Logout successful! See you again.");
    res.redirect("/login");
  });
};
