const mongoose = require("mongoose");

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      description: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      discountPrice: {
        type: Number,
        default: 0,
      },

      category: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },

      brand: {
        type: String,
        required: true,
        trim: true,
      },

      gender: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
        default: "Unisex",
      },

      material: {
        type: String,
        default: "",
      },

      occasion: {
        type: String,
        default: "",
      },

      sizes: [String],

      colors: [String],

      stock: {
        type: Number,
        default: 0,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      trending: {
        type: Boolean,
        default: false,
      },

      newArrival: {
        type: Boolean,
        default: false,
      },

      images: [
        {
          url: String,
          publicId: String,
        },
      ],

      averageRating: {
        type: Number,
        default: 0,
      },

      reviewCount: {
        type: Number,
        default: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Product",
    productSchema
  );