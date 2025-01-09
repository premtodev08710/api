const mongoose = require("mongoose");


// สร้าง Schema สำหรับ Company
const schema = new mongoose.Schema({
  name : { type : String , require : true, trim : true},
  salary : {type : Number },
  carated : {type : Date , default: Date.now},
  },
{
  collection : 'Staffs'
}
);

// สร้างโมเดล Company
const staff = mongoose.model("Staff", schema);

module.exports = staff;
