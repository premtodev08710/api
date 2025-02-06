const express = require('express');
const router = express.Router();
const ordercontrolloers = require('../controlloers/ordercontrolloers');

/* GET users listing. */
router.get('/', ordercontrolloers.index); // แสดงคำสั่งซื้อทั้งหมด
router.get('/:id', ordercontrolloers.show); // แสดงคำสั่งซื้อเฉพาะ ID
router.get('/customer/:id', ordercontrolloers.customer); // แสดงคำสั่งซื้อเฉพาะ ID customer
router.post('/', ordercontrolloers.create); // สร้างคำสั่งซื้อใหม่
router.put('/:id', ordercontrolloers.update); // อัปเดตคำสั่งซื้อ
router.delete('/:id', ordercontrolloers.delete); // ลบคำสั่งซื้อ

module.exports = router;
