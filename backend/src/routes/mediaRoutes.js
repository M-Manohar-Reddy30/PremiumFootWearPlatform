const express = require("express");

const router = express.Router();

const clerkProtect = require(
  "../middleware/clerkAuthMiddleware"
);

const adminProtect = require(
  "../middleware/adminAuthMiddleware"
);

const upload =
require("../middleware/uploadMiddleware");

const {
  uploadImage,
} = require(
  "../controllers/mediaController"
);

router.post(
 "/upload",
 adminProtect,
 upload.single("image"),
 uploadImage
);

router.post(
 "/review-upload",
 clerkProtect,
 upload.single("image"),
 uploadImage
);

module.exports = router;