const express = require('express');
const router = express.Router();
const usersController = require('../controlloers/userscontrolloers');
router.post('/', usersController.createUser); // สร้างผู้ใช้ใหม่
router.get('/', usersController.getAllUsers); // ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/:id', usersController.getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
router.put('/:id', usersController.updateUser); // อัปเดตข้อมูลผู้ใช้
router.delete('/:id', usersController.deleteUser); // ลบผู้ใช้
router.post('/login', usersController.loginUser); // ล็อกอินผู้ใช้

module.exports = router;
