const Order = require('../models/order');
const Product = require('../models/product'); // Import Product Model

// แสดงรายการคำสั่งซื้อทั้งหมด
exports.index = async (req, res, next) => {
  try {
    const orders = await Order.find() // Populate product details
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error('Error in index function:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// แสดงคำสั่งซื้อเฉพาะ ID
exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('order_items.product_id');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ data: order });
  } catch (error) {
    console.error('Error in show function:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// สร้างคำสั่งซื้อใหม่
exports.create = async (req, res, next) => {
  try {
    const { customer_name, customer_address, order_items, total_price, status } = req.body;

    // ตรวจสอบสินค้าแต่ละชิ้น
    for (const item of order_items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
      }
      item.product_title = product.title; // เพิ่มชื่อสินค้า
    }

    const order = new Order({
      customer_name,
      customer_address,
      order_items,
      total_price,
      status
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', data: order });
  } catch (error) {
    console.error('Error in create function:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// อัปเดตคำสั่งซื้อ
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const order = await Order.findByIdAndUpdate(id, updatedData, { new: true }).populate('order_items.product_id');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', data: order });
  } catch (error) {
    console.error('Error in update function:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// ลบคำสั่งซื้อ
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error in delete function:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
