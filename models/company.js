const mongoose = require("mongoose");
// const { settings } = require("../app");

// สร้าง Schema สำหรับ Company
const schema = new mongoose.Schema({
  name: String,
  address: {
    province: String,
  },
},{
  collection : 'companys'
}
);

// สร้างโมเดล Company
const Company = mongoose.model("Company ", schema);

module.exports = Company;
