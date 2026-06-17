const express = require("express");

const router = express.Router();

const adminProtect = require(
  "../middleware/adminAuthMiddleware"
);

const {
  getSettings,
  updateSettings,
} = require(
  "../controllers/settingController"
);

router.get("/", getSettings);

router.put(
  "/",
  adminProtect,
  updateSettings
);

module.exports = router;