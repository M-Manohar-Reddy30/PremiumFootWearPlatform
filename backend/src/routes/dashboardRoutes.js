const express =
require("express");

const router =
express.Router();

const adminProtect =
require(
"../middleware/adminAuthMiddleware"
);

const {
getDashboardStats,
getOrderAnalytics,
getProductAnalytics
}
=
require(
"../controllers/dashboardController"
);

router.get(
"/stats",
adminProtect,
getDashboardStats
);

router.get(
"/orders",
adminProtect,
getOrderAnalytics
);

router.get(
"/products",
adminProtect,
getProductAnalytics
);

module.exports =
router;