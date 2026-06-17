const User =
  require("../models/User");

exports.syncUser =
  async (req, res) => {
    try {
      const {
        clerkId,
        email
      } = req.body;

      let user =
        await User.findOne({
          clerkId
        });

      if (!user) {
        user =
          await User.create({
            clerkId,
            email
          });
      }

      res.status(200).json({
        success: true,
        data: user
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

  exports.getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findOne({
          clerkId:
            req.params.clerkId
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found"
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

  const calculateProfile =
require("../utils/profileCompletion");

exports.updateProfile =
  async (req, res) => {
    try {

      const user =
        await User.findOne({
          clerkId:
            req.params.clerkId
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found"
        });
      }

      Object.assign(
        user,
        req.body
      );

      const result =
        calculateProfile(user);

      user.profileCompleted =
        result.completed;

      user.profileCompletionPercentage =
        result.percentage;

      await user.save();

      res.status(200).json({
        success: true,
        data: user
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };