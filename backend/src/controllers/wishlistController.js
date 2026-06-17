const User =
require("../models/User");

const Product =
require("../models/Product");

exports.addToWishlist =
async (req,res) => {

try {

const { productId } =
req.body;

const user =
await User.findOne({
clerkId:req.user.sub
});

if(!user){

return res.status(404)
.json({
success:false,
message:"User not found"
});

}

const exists =
user.wishlist.some(
item =>
item.toString() ===
productId
);

if(exists){

return res.status(400)
.json({
success:false,
message:
"Already in wishlist"
});

}

user.wishlist.push(
productId
);

await user.save();

res.status(200).json({
success:true,
message:
"Added to wishlist"
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.getWishlist =
async (req,res)=>{

try{

const user =
await User.findOne({
clerkId:req.user.sub
})
.populate("wishlist");

res.status(200).json({
success:true,
data:user.wishlist
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.removeWishlist =
async (req,res)=>{

try{

const { productId } =
req.body;

const user =
await User.findOne({
clerkId:req.user.sub
});

user.wishlist =
user.wishlist.filter(
item =>
item.toString() !==
productId
);

await user.save();

res.status(200).json({
success:true,
message:
"Removed successfully"
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};