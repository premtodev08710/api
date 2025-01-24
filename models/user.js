const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema สำหรับ Address
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  suite: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true }
});

// Schema สำหรับ User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  username: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Invalid email format'] },
  password: { type: String, required: true, minlength: 6 },
  address: addressSchema,
  role: { type: String, enum: ['admin', 'member'], default: 'member' }
});

// Hook: เข้ารหัสรหัสผ่านก่อนบันทึก
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // ถ้าไม่ได้เปลี่ยนรหัสผ่าน ให้ข้ามไป
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // เข้ารหัสรหัสผ่าน
  next();
});

// ตรวจสอบรหัสผ่าน
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // เปรียบเทียบรหัสผ่าน
};

module.exports = mongoose.model('User', userSchema);
