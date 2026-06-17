const mongoose =
require("mongoose");

const orderSchema =
new mongoose.Schema(
{
  user:{
    type:
    mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  products:[
    {
      product:{
        type:
        mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },

      size:{
        type:String,
        default:""
      },

      color:{
        type:String,
        default:""
      },

      quantity:{
        type:Number,
        default:1
      },

      price:{
        type:Number,
        default:0
      }
    }
  ],

  totalAmount:{
    type:Number,
    required:true
  },

  whatsappMessage:{
    type:String
  },

  orderStatus:{
    type:String,

    enum:[
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled"
    ],

    default:"pending"
  }

},
{
 timestamps:true
}
);

module.exports =
mongoose.model(
"Order",
orderSchema
);