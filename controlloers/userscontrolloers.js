const User = require('../models/user');

// ล็อกอินผู้ใช้

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบว่าข้อมูลถูกส่งมาครบถ้วนหรือไม่
    if (!username || !password) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่ในระบบหรือไม่
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้งานในระบบ' });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // สร้างข้อมูลสำหรับการตอบกลับ
    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // ตอบกลับเมื่อล็อกอินสำเร็จ
    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user: userResponse
    });
  } catch (error) {
    // จัดการข้อผิดพลาด
    res.status(500).json({ message: 'ไม่สามารถเข้าสู่ระบบได้', error: error.message });
  }
};



// สร้างผู้ใช้ใหม่
exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, address, role } = req.body;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!name || !username || !email || !password || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // สร้างผู้ใช้ใหม่
    const user = new User({
      name,
      username,
      email,
      password,
      address,
      role
    });

    // บันทึกผู้ใช้ลงในฐานข้อมูล
    await user.save();

    // ตอบกลับเมื่อสำเร็จ
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    // ตรวจจับข้อผิดพลาด เช่น email หรือ username ซ้ำ
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate username or email' });
    }
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

// ดึงข้อมูลผู้ใช้ทั้งหมด
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// ดึงข้อมูลผู้ใช้ตาม ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

// อัปเดตข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// ลบผู้ใช้
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};
