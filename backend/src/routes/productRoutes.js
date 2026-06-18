const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getAdminProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getFilterOptions,
} = require(
  "../controllers/productController"
);

const adminProtect = require(
  "../middleware/adminAuthMiddleware"
);

router.get("/", getProducts);

router.get(
  "/slug/:slug",
  getProductBySlug
);

router.get(
  "/category/:slug",
  getProductsByCategory
);

router.get(
  "/filters/options",
  getFilterOptions
);

router.get(
  "/:id",
  getProductById
);

router.post(
  "/",
  adminProtect,
  createProduct
);

router.put(
  "/:id",
  adminProtect,
  updateProduct
);

router.delete(
  "/:id",
  adminProtect,
  deleteProduct
);

router.put(
  "/restore/:id",
  adminProtect,
  restoreProduct
);

router.get(
  "/admin",
  adminProtect,
  getAdminProducts
);

module.exports = router;