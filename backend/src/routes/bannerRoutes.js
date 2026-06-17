const express = require("express");

const router = express.Router();

const adminProtect = require(
  "../middleware/adminAuthMiddleware"
);

const {
  createBanner,
  getBanners,
  getActiveBanners,
  updateBanner,
  deleteBanner
} = require(
  "../controllers/bannerController"
);

router.get("/", getBanners);

router.get(
  "/active",
  getActiveBanners
);

router.post(
  "/",
  adminProtect,
  createBanner
);

router.put(
  "/:id",
  adminProtect,
  updateBanner
);

router.delete(
  "/:id",
  adminProtect,
  deleteBanner
);

module.exports = router;