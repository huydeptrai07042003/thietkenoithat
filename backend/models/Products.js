const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    interiorBudget: {
      type: Number,
      required: true,
    },
    roughBudget: {
      type: Number,
      required: true,
    },
    acreage: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User collection
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
