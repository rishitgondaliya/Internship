const bcrypt = require("bcryptjs");
const sendgrid = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { validationResult } = require("express-validator");

const User = require("../models/user");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const transporter = nodemailer.createTransport(
//   sendgrid({
//     auth: {
//       // api_user: 'apikey',
//       api_key: process.env.SENDGRID_API_KEY,
//     },
//   })
// );

exports.getSignup = (req, res) => {
  let message = req.flash("error")[0] || null;
  const formData = req.session.formData || {};
  delete req.session.formData;

  res.status(422).render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign Up",
    errorMsg: message,
    oldInput: formData,
    validationResult: [],
  });
};

exports.postSignup = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formData = { name, email, password };
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Sign Up",
      errorMsg: errors.array()[0].msg,
      oldInput: formData,
      validationResult: errors.array(),
    });
  }
  bcrypt
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
      const msg = {
        from: "myshop.mail.from@gmail.com",
        to: email,
        subject: "Sign up succeeded",
        html: "<h1>Welcome to our website</h1><p>Thank you for joining<p>",
      };

      return sgMail.send(msg);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
    validationResult: [],
  });
};

exports.postLogin = (req, res) => {
  // req.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "isLoggedIn = true; httpOnly"); // set cookie
  // User.findById("67ca9bbf2d0bf9ca7b9d58e2")
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0].msg;
    req.flash("error", error.msg);
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMsg: error,
      oldInput: { email, password },
      validationResult: errors.array(),
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMsg: "User not found",
          oldInput: { email, password },
          validationResult: errors.array(),
        });
      }
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          req.session.formData = { email, password };
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            errorMsg: "Incorrect password !!",
            oldInput: { email, password },
            validationResult: [{ path: "password" }],
          });
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
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    // req.flash("success", "Logout successful! See you again.");
    res.redirect("/login");
  });
};

exports.getResetPassword = (req, res) => {
  let message = req.flash("error")[0] || null;
  res.render("auth/reset", {
    errorMsg: message,
    path: "/reset",
    pageTitle: "Reset Password",
    oldInput: {},
  });
};

exports.postResetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log("Error generating token:", err);
      return res.redirect("/reset");
    }

    const token = buffer.toString("hex");
    const email = req.body.email;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          req.flash("error", "User not found!");
          return res.redirect("/reset");
        }

        // Save token and expiration in user model
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes

        return user.save(); // Make sure to return this
      })
      .then((updatedUser) => {
        if (!updatedUser) {
          throw new Error("Token not saved in database");
        }

        const resetUrl = `http://localhost:3000/reset/${token}`;
        const msg = {
          to: email,
          from: "myshop.mail.from@gmail.com",
          subject: "Password Reset",
          text: "Click the link below to reset your password.",
          html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
        };

        return sgMail.send(msg);
      })
      .then(() => {
        req.flash(
          "success",
          "Password reset link has been sent to your email."
        );
        res.redirect("/login");
      })
      .catch((err) => {
        console.error("Error in postResetPassword:", err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/reset");
      });
  });
};

exports.getNewPassword = (req, res) => {
  const token = req.params.token;
  User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid or expired token.");
        return res.redirect("/reset");
      }

      let message = req.flash("error")[0] || null;
      let successMsg = req.flash("success")[0] || null;
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMsg: message,
        successMsg: successMsg,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again.");
      res.redirect("/reset");
    });
};

exports.postNewPassword = (req, res) => {
  const newPassword = req.body.newPassword;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetPasswordToken: passwordToken,
    resetPasswordExpires: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetPasswordToken = undefined;
      resetUser.resetPasswordExpires = undefined;
      return resetUser.save();
    })
    .then((result) => {
      req.flash("success", "Password has been changed successfully.");
      res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
