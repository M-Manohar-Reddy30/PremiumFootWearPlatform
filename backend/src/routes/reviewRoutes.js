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
createReview,
getProductReviews,
deleteReview,
getAllReviews
}
=
require(
"../controllers/reviewController"
);

router.post(
"/",
clerkProtect,
requireCompleteProfile,
createReview
);

router.get(
"/product/:productId",
getProductReviews
);

router.get(
 "/",
 getAllReviews
);

router.get(
 "/admin",
 adminProtect,
 getAllReviews
);

router.delete(
"/:id",
adminProtect,
deleteReview
);

module.exports =
router;