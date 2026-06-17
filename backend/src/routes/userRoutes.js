const express = require("express");

const router =
  express.Router();

const {
  syncUser,
  getProfile,
  updateProfile
} = require(
  "../controllers/userController"
);

router.post(
  "/sync",
  syncUser
);

router.get(
  "/:clerkId",
  getProfile
);

router.put(
  "/:clerkId",
  updateProfile
);

module.exports =
  router;