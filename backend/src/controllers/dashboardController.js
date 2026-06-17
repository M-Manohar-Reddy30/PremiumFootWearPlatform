const Product =
require("../models/Product");

const Category =
require("../models/Category");

const User =
require("../models/User");

const Review =
require("../models/Review");

const Order =
require("../models/Order");

exports.getDashboardStats =
async(req,res)=>{

try{

const [
  totalProducts,
  totalCategories,
  totalUsers,
  totalOrders,
  totalReviews,
  orders
] =
await Promise.all([

  Product.countDocuments(),

  Category.countDocuments(),

  User.countDocuments(),

  Order.countDocuments(),

  Review.countDocuments(),

  Order.find()
]);

let totalRevenue = 0;

orders.forEach(order => {

  totalRevenue +=
  order.totalAmount || 0;

});

res.status(200).json({

success:true,

data:{
  totalProducts,
  totalCategories,
  totalUsers,
  totalOrders,
  totalReviews,
  totalRevenue
}

});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.getOrderAnalytics =
async(req,res)=>{

try{

const analytics =
await Order.aggregate([

{
$group:{
_id:{
month:{
$month:
"$createdAt"
}
},
count:{
$sum:1
}
}
},

{
$sort:{
"_id.month":1
}
}

]);

res.status(200).json({
success:true,
data:analytics
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.getProductAnalytics =
async(req,res)=>{

try{

const featured =
await Product.countDocuments({
featured:true
});

const trending =
await Product.countDocuments({
trending:true
});

const arrivals =
await Product.countDocuments({
newArrival:true
});

res.status(200).json({

success:true,

data:{
featured,
trending,
arrivals
}

});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};