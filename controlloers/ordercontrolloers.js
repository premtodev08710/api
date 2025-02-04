const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user'); // Import User Model

// แสดงรายการคำสั่งซื้อทั้งหมด
exports.index = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customer_id', 'name address'); // ดึงข้อมูลผู้ใช้

    console.log('Fetched orders:', orders); // ตรวจสอบข้อมูลที่ดึงมา

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // แปลงผลลัพธ์ให้ตรงกับ JSON ที่ต้องการ
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      customer_id: order.customer_id?._id || null,
      customer_name: order.customer_id?.name || 'Unknown',
      customer_address: order.customer_id?.address || {},
      total_price: order.total_price,
      status: order.status,
      order_items: order.order_items.map(item => ({
        product_id: item.product_id,
        product_title: item.product_title,
        quantity: item.quantity,
        price: item.price,
        _id: item._id
      })),
      order_date: order.order_date,
      __v: order.__v
    }));

    console.log('Formatted orders:', formattedOrders); // ตรวจสอบรูปแบบ JSON ที่ส่งกลับ

    res.status(200).json({ data: formattedOrders });
  } catch (error) {
    console.error('Error in index function:', error);
    res.status(500).json({ error: error.message }); // ส่งข้อความข้อผิดพลาดที่ชัดเจนขึ้น
  }
};

// แสดงคำสั่งซื้อเฉพาะ ID
exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('customer_id', 'name address')
      .populate('order_items.product_id', 'title');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // แปลงข้อมูลให้อยู่ในรูปแบบ JSON ที่ต้องการ
    const formattedOrder = {
      _id: order._id,
      customer_id: order.customer_id._id,
      customer_name: order.customer_id.name,
      customer_address: order.customer_id.address,
      total_price: order.total_price,
      status: order.status,
      order_items: order.order_items.map(item => ({
        product_id: item.product_id,
        product_title: item.product_title,
        quantity: item.quantity,
        price: item.price,
        _id: item._id
      })),
      order_date: order.order_date,
      __v: order.__v
    };

    res.status(200).json({ data: formattedOrder });
  } catch (error) {
    console.error('Error in show function:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// สร้างคำสั่งซื้อใหม่
exports.create = async (req, res, next) => {
  try {
    const { customer_id, order_items, total_price, status } = req.body;

    // ค้นหาผู้ใช้
    const user = await User.findById(customer_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ตรวจสอบสินค้าแต่ละชิ้น
    for (const item of order_items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
      }
      item.product_title = product.title; // เพิ่มชื่อสินค้า
    }

    const order = new Order({
      customer_id,
      customer_name: user.name,
      customer_address: user.address,
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

    const order = await Order.findByIdAndUpdate(id, updatedData, { new: true })
      .populate('customer_id', 'name address')
      .populate('order_items.product_id', 'title');

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
