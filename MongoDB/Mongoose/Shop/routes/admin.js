const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/admin_controller");
const isAuth = require("../middleware/is_auth");

const router = express.Router();

// controllers will be executed from left to right
router.get("/admin/add-product", isAuth, adminController.getAddProduct);

router.post(
  "/admin/add-product",
  [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least 2 characters long.")
      .isAlphanumeric()
      .withMessage("Product name can only contain letters and numbers."),

    check("price")
      .notEmpty()
      .withMessage("Price is required.")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),

    check("desc")
      .trim()
      .notEmpty()
      .withMessage("Description is required.")
      .isLength({ min: 5, max: 120 })
      .withMessage("Description must be between 5 and 120 characters long.")
      .matches(/^[a-zA-Z0-9\s.,'-]+$/)
      .withMessage(
        "Description can only contain letters, numbers, spaces, and basic punctuation."
      ),

    check("imgUrl")
      .notEmpty()
      .withMessage("Image URL is required.")
      .isURL()
      .withMessage("Please enter a valid image URL."),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/admin/products", isAuth, adminController.getProducts);

router.get(
  "/admin/edit-product/:productId",
  isAuth,
  adminController.getEditProduct
);

router.post(
  "/admin/edit-product",
  [
    check("updatedName")
      .trim()
      .notEmpty()
      .withMessage("Product name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least 2 characters long.")
      .isAlphanumeric()
      .withMessage("Product name can only contain letters and numbers."),

    check("updatedPrice")
      .notEmpty()
      .withMessage("Price is required.")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),

    check("updatedDesc")
      .trim()
      .notEmpty()
      .withMessage("Description is required.")
      .isLength({ min: 5, max: 120 })
      .withMessage("Description must be between 5 and 120 characters long.")
      .matches(/^[a-zA-Z0-9\s.,'-]+$/)
      .withMessage(
        "Description can only contain letters, numbers, spaces, and basic punctuation."
      ),

    check("updatedImgUrl")
      .notEmpty()
      .withMessage("Image URL is required.")
      .isURL()
      .withMessage("Please enter a valid image URL."),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/admin/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
