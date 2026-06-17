const express =
require("express");

const router =
express.Router();

const clerkProtect =
require(
"../middleware/clerkAuthMiddleware"
);

const adminProtect =
require(
"../middleware/adminAuthMiddleware"
);

const requireCompleteProfile =
require(
"../middleware/profileGuard"
);

const {
placeOrder,
getMyOrders,
getAllOrders,
updateOrderStatus,
getRecentOrders
}
=
require(
"../controllers/orderController"
);

router.post(
"/place",
clerkProtect,
requireCompleteProfile,
placeOrder
);

router.get(
"/my-orders",
clerkProtect,
requireCompleteProfile,
getMyOrders
);

router.get(
"/admin",
adminProtect,
getAllOrders
);

router.put(
 "/:id/status",
 adminProtect,
 updateOrderStatus
);

router.get(
"/recent",
getRecentOrders
);

module.exports =
router;