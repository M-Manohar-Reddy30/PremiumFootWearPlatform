const Setting = require("../models/Setting");

exports.getSettings = async (
  req,
  res
) => {
  try {
    let settings =
      await Setting.findOne();

    if (!settings) {
      settings =
        await Setting.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSettings =
  async (req, res) => {
    try {
      let settings =
        await Setting.findOne();

      if (!settings) {
        settings =
          await Setting.create({});
      }

      settings =
        await Setting.findByIdAndUpdate(
          settings._id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        data: settings,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };