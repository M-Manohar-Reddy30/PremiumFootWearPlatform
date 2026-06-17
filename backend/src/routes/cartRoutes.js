const express =
require("express");

const router =
express.Router();

const clerkProtect =
require(
"../middleware/clerkAuthMiddleware"
);

const requireCompleteProfile =
require(
"../middleware/profileGuard"
);

const {
addToCart,
getCart,
updateCartItem,
removeFromCart
}
=
require(
"../controllers/cartController"
);

router.post(
"/add",
clerkProtect,
requireCompleteProfile,
addToCart
);

router.get(
"/",
clerkProtect,
requireCompleteProfile,
getCart
);

router.put(
"/update",
clerkProtect,
requireCompleteProfile,
updateCartItem
);

router.delete(
"/remove",
clerkProtect,
requireCompleteProfile,
removeFromCart
);

module.exports =
router;