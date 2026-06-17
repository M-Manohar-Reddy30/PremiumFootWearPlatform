const Review =
require("../models/Review");

const User =
require("../models/User");

const Product =
require("../models/Product");

exports.createReview =
async (req,res)=>{

try{

const {
productId,
rating,
comment,
images
}
=
req.body;

const user =
await User.findOne({
clerkId:req.user.sub
});

if(!user){
return res.status(404).json({
success:false,
message:"User not found"
});
}

// CHECK FOR EXISTING REVIEW
const existingReview =
await Review.findOne({
user:user._id,
product:productId
});

if(existingReview){
return res.status(400).json({
success:false,
message:"You already reviewed this product"
});
}

const review =
await Review.create({
user:user._id,
product:productId,
rating,
comment,
images
});

await updateProductRating(
productId
);

res.status(201).json({
success:true,
data:review
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

const updateProductRating =
async(productId)=>{

const reviews =
await Review.find({
product:productId
});

const total =
reviews.reduce(
(sum,review)=>
sum + review.rating,
0
);

const average =
reviews.length
?
total /
reviews.length
:0;

await Product.findByIdAndUpdate(
productId,
{
averageRating:
average.toFixed(1),

reviewCount:
reviews.length
}
);

};

exports.getProductReviews =
async (req,res)=>{

try{

const reviews =
await Review.find({
product:req.params.productId,
isApproved:true
})
.populate(
"user",
"fullName"
)
.sort({
createdAt:-1
});

res.status(200).json({
success:true,
data:reviews
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.deleteReview =
async (req,res)=>{

try{

const review =
await Review.findById(
req.params.id
);

if(!review){

return res.status(404)
.json({
success:false,
message:
"Review not found"
});

}

const productId =
review.product;

await review.deleteOne();

await updateProductRating(
productId
);

res.status(200).json({
success:true,
message:
"Review deleted"
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.getAllReviews =
async (req, res) => {

  try {

    const reviews =
      await Review.find()

        .populate(
          "user",
          "fullName email"
        )

        .populate(
          "product",
          "name"
        )

        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      data: reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};