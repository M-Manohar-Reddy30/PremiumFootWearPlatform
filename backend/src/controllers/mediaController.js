const asyncHandler =
require(
  "../utils/asyncHandler"
);

exports.uploadImage =
asyncHandler(
async(req,res)=>{

if(!req.file){

return res.status(400)
.json({

success:false,

message:
"No image uploaded"

});

}

res.status(200).json({

success:true,

imageUrl:
req.file.path,

publicId:
req.file.filename

});

}
);