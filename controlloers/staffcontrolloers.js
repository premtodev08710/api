const Staff = require("../models/staff");

exports.index = async (req, res, next) => {
  const staff = await Staff.find().sort({ _id: -1 });
  res.status(200).json({
    data: staff,
  });
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const staff = await Staff.findOne({ _id: req.params.id });
    const staff = await Staff.findById(id);
    if (!staff) {
      throw new Error("ไม่พบข้อทูลพนักงาน");
    }
    res.status(200).json({
      data: staff,
    });
  } catch (error) {
    res.status(400).json({
      error: (Message = "เกิดข้อผิดพลาด") + error.message,
    });
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const staff = await Staff.findOne({ _id: req.params.id });
    const staff = await Staff.deleteOne({_id : id});
    if (staff.deletedCount===0) {
      throw new Error("ไม่สามารถลบข้อมูลได้");
    }
    res.status(200).json({
      Message : "ลบสำเร็จ"
    });
  } catch (error) {
    res.status(400).json({
      error: (Message = "เกิดข้อผิดพลาด") + error.message,
    });
  }
};

exports.insert = async (req, res, next) => {
  const { name, salary } = req.body;

  let staff = new Staff({
    name: name,
    salary: salary,
  });
  await staff.save();
  res.status(201).json({
    Message: "เพ่ิมเสร็จเรียบร้อย",
  });
};
