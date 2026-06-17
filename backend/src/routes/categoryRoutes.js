const express = require("express");

const router = express.Router();

const adminProtect = require(
  "../middleware/adminAuthMiddleware"
);

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require(
  "../controllers/categoryController"
);

router.get("/", getCategories);

router.get(
  "/:id",
  getCategoryById
);

router.post(
  "/",
  adminProtect,
  createCategory
);

router.put(
  "/:id",
  adminProtect,
  updateCategory
);

router.delete(
  "/:id",
  adminProtect,
  deleteCategory
);

module.exports = router;