const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth_controller");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .custom((value, { req }) => {
        if (value === req.body.password) {
          throw new Error("Password and name cannot be the same!");
        }
        return true;
      }),

    check("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please enter a valid email address!")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email already exists! Please use a different email."
            );
          }
        });
      }),

    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .isAlphanumeric()
      .withMessage("Password must contain only letters and numbers.")
      .custom((value, { req }) => {
        if (value === req.body.email) {
          throw new Error("Password and email cannot be the same!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("email")
      .trim()
      .notEmpty()
      .withMessage("Please enter email!")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (!user) {
          req.session.formData = { email: value }; // Store entered email in session
          return Promise.reject("User not found!");
        }
        return true;
      }),

    check("password").trim().notEmpty().withMessage("Please enter password!"),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getResetPassword);

router.post("/reset", authController.postResetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
