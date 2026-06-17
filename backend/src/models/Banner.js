const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    subtitle: {
      type: String,
      default: ""
    },

    buttonText: {
      type: String,
      default: ""
    },

    buttonLink: {
      type: String,
      default: ""
    },

    image: {
      url: {
        type: String,
        required: true
      },

      publicId: {
        type: String,
        required: true
      }
    },

    active: {
      type: Boolean,
      default: true
    },

    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Banner",
  bannerSchema
);