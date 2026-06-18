const Banner = require("../models/Banner");
const cloudinary =
require("../config/cloudinary");

exports.createBanner = async (
  req,
  res
) => {
  try {
    const banner =
      await Banner.create(req.body);

    res.status(201).json({
      success: true,
      data: banner
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBanners = async (
  req,
  res
) => {
  try {
    const banners =
      await Banner.find()
        .sort({
          displayOrder: 1
        });

    res.status(200).json({
      success: true,
      data: banners
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getActiveBanners =
  async (req, res) => {
    try {
      const banners =
        await Banner.find({
          active: true
        }).sort({
          displayOrder: 1
        });

      res.status(200).json({
        success: true,
        data: banners
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  exports.updateBanner =
  async (req, res) => {
    try {
      const banner =
        await Banner.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true
          }
        );

      res.status(200).json({
        success: true,
        data: banner
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

exports.deleteBanner =
async (req,res)=>{

try{

const banner =
await Banner.findById(
req.params.id
);

if(!banner){

return res.status(404).json({
success:false,
message:"Banner not found"
});

}

if(
banner.image &&
banner.image.publicId
){

await cloudinary.uploader.destroy(
banner.image.publicId
);

}

await Banner.findByIdAndDelete(
req.params.id
);

res.status(200).json({
success:true,
message:
"Banner deleted successfully"
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};