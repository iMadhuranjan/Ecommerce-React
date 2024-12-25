const { timeStamp } = require("console");
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totlaStock: Number,
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
