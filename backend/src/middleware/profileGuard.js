const User = require("../models/User");

const requireCompleteProfile = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findOne({
      clerkId: req.user.sub,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profileCompleted) {
      return res.status(403).json({
        success: false,
        message:
          "Please complete your profile before continuing",
      });
    }

    next();
  } catch (error) {
    console.error(
      "Profile Guard Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = requireCompleteProfile;