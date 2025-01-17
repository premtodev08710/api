const mongoose = require("mongoose");
// const { settings } = require("../app");

// สร้าง Schema สำหรับ Company
const schema = new mongoose.Schema({
  id: Number,
  title: String,
  detail: String,
  date:String,
  price:Number,
  picture:String,
},{
  collection : 'products'
}
);

// สร้างโมเดล Company
const Product = mongoose.model("product", schema);

module.exports = Product;
