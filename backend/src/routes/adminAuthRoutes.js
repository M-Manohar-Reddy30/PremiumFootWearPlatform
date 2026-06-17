const express = require("express");

const router = express.Router();

const {
  adminLogin
} = require("../controllers/adminAuthController");

const adminProtect = require(
  "../middleware/adminAuthMiddleware"
);

router.post("/login", adminLogin);

router.get(
  "/verify",
  adminProtect,
  (req, res) => {
    res.status(200).json({
      success: true,
      admin: req.admin
    });
  }
);

module.exports = router;