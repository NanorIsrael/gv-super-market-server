const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    sku: {
      type: String,
      default: "N/A",
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("{Product", productSchema);
module.exports = Product;
