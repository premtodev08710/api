const mongoose = require('mongoose');

// Schema สำหรับ Order Item
const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId, // อ้างอิงถึง Product
    required: true,
    ref: 'Product' // ชื่อ Model "Product"
  },
  product_title: {
    type: String, // ชื่อสินค้า
    required: true,
    maxlength: 200
  },
  quantity: {
    type: Number, // จำนวนสินค้า
    required: true,
    min: 1
  },
  price: {
    type: Number, // ราคาต่อชิ้น
    required: true,
    min: 0
  }
});

// Schema สำหรับ Order
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // อ้างอิงถึง User
    ref: 'User', // ชื่อ Model "User"
    required: true
  },
  customer_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  customer_address: {
    type: String,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  total_price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['กำลังดำเนินการ', 'จัดส่งสำเร็จ', 'รอการชำระเงิน'],
    default: 'รอการชำระเงิน'
  },
  order_items: [orderItemSchema] // Embedded Document
});

module.exports = mongoose.model('Order', orderSchema);
