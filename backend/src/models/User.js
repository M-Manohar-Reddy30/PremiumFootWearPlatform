const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true
    },

    fullName: {
      type: String,
      default: ""
    },

    mobileNumber: {
      type: String,
      default: ""
    },

    alternateMobileNumber: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    state: {
      type: String,
      default: ""
    },

    pincode: {
      type: String,
      default: ""
    },

    country: {
      type: String,
      default: ""
    },

    profileCompleted: {
      type: Boolean,
      default: false
    },

    profileCompletionPercentage: {
      type: Number,
      default: 0
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        size: {
          type: String,
          default: ""
        },

        color: {
          type: String,
          default: ""
          
        },

        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);