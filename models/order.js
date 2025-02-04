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
  customer_id: {
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
    street: { type: String, required: true, maxlength: 255 },
    suite: { type: String, maxlength: 50 },
    city: { type: String, required: true, maxlength: 100 },
    zipcode: { type: String, required: true, maxlength: 20 }
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

// ใช้ pre-hook เพื่อดึงข้อมูลที่อยู่ของผู้ใช้ก่อนบันทึกคำสั่งซื้อ
orderSchema.pre('save', async function (next) {
  if (!this.customer_address && this.customer_id) {
    try {
      const User = mongoose.model('User');
      const user = await User.findById(this.customer_id).select('name address');

      if (user) {
        this.customer_name = user.name;
        this.customer_address = user.address;
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
