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
addToWishlist,
getWishlist,
removeWishlist
}
=
require(
"../controllers/wishlistController"
);

router.post(
"/add",
clerkProtect,
requireCompleteProfile,
addToWishlist
);

router.get(
"/",
clerkProtect,
requireCompleteProfile,
getWishlist
);

router.delete(
"/remove",
clerkProtect,
requireCompleteProfile,
removeWishlist
);

module.exports =
router;