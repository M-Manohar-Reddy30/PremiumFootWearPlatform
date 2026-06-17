const User =
require("../models/User");

const Order =
require("../models/Order");

const Setting =
require("../models/Setting");

const generateWhatsAppMessage =
require(
"../utils/whatsappGenerator"
);

exports.placeOrder =
async(req,res)=>{

try{

const user =
await User.findOne({
clerkId:req.user.sub
})
.populate(
"cart.product"
);

if(
!user.cart.length
){

return res.status(400)
.json({
success:false,
message:
"Cart is empty"
});
}

let total = 0;

const orderProducts =
user.cart.map((item) => {

  // Check stock before creating order
  if (item.quantity > item.product.stock) {
    throw new Error(
      `${item.product.name} has only ${item.product.stock} items left in stock`
    );
  }

  const price =
    item.product.discountPrice ||
    item.product.price;

  total += price * item.quantity;

  return {
    product: item.product._id,

    size:
    item.size || "",

    color:
    item.color || "",

    quantity:
    item.quantity,

    price
  };
});

const message =
generateWhatsAppMessage(
user,
user.cart,
total
);

const order =
await Order.create({

user:user._id,

products:
orderProducts,

totalAmount:
total,

whatsappMessage:
message

});

// Reduce stock after successful order

for (const item of user.cart) {

  item.product.stock -= item.quantity;

  await item.product.save();

}

const settings =
await Setting.findOne();

const whatsappUrl =
`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;

user.cart = [];

await user.save();

res.status(201).json({
success:true,

order,

whatsappUrl
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.getMyOrders =
async(req,res)=>{

try{

const user =
await User.findOne({
clerkId:req.user.sub
});

const orders =
await Order.find({
user:user._id
})
.populate(
"products.product"
)
.sort({
createdAt:-1
});

res.status(200).json({
success:true,
data:orders
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

exports.getAllOrders =
async(req,res)=>{

try{

 const orders =
 await Order.find()
 .populate("user")
 .populate("products.product")
 .sort({
  createdAt:-1
 });

 res.status(200).json({
  success:true,
  data:orders
 });

}
catch(error){

 res.status(500).json({
  success:false,
  message:error.message
 });

}
};

exports.updateOrderStatus =
async(req,res)=>{

try{

 const order =
 await Order.findById(
  req.params.id
 );

 if(!order){

  return res.status(404)
  .json({
   success:false,
   message:"Order not found"
  });

 }

 order.orderStatus =
 req.body.orderStatus;

 await order.save();

 res.status(200).json({
  success:true,
  data:order
 });

}
catch(error){

 res.status(500).json({
  success:false,
  message:error.message
 });

}
};

exports.getRecentOrders =
async(req,res)=>{

try{

const orders =
await Order.find()

.populate(
"products.product"
)

.populate(
"user"
)

.sort({
createdAt:-1
})

.limit(10);

const recentOrders =
orders.map(order=>({

name:
order.user?.fullName ||
"Customer",

city:
order.user?.city ||
"India",

product:
order.products?.[0]
?.product?.name ||
"Product",

createdAt:
order.createdAt

}));

res.status(200).json({

success:true,

data:
recentOrders

});

}
catch(error){

res.status(500).json({

success:false,

message:
error.message

});

}

};