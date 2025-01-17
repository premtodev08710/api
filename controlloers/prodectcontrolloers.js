const Product = require("../models/product");

exports.index = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error in index function:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found or already deleted" });
    }
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error in destroy function:", error);
    res.status(400).json({ error: `Error deleting product: ${error.message}` });
  }
};
// exports.update = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Product.updateOne({id : ""})
//     res.status(200).json({ message: "Product successfully deleted" });
//   } catch (error) {
//     console.error("Error in destroy function:", error);
//     res.status(400).json({ error: `Error deleting product: ${error.message}` });
//   }
// };

// exports.update = async (req, res, next) => {
//   try {
//     const { id } = req.params; // Extract ID from request parameters
//     const updateData = req.body; // Get update data from request body

//     // Ensure `id` is valid
//     if (!id) {
//       return res.status(400).json({ error: "Invalid or missing product ID." });
//     }

//     // Perform the update operation
//     const result = await Product.updateOne({ _id : id }, { $set: updateData });

//     if (result.nModified === 0) {
//       return res.status(404).json({ message: "No product found to update." });
//     }

//     res.status(200).json({ message: "Product successfully updated." });
//   } catch (error) {
//     console.error("Error in update function:", error);
//     res.status(500).json({ error: `Error updating product: ${error.message}` });
//   }
// };

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params; // ใช้ฟิลด์ id ที่เป็น string
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({ error: 'Invalid ID or data' });
    }

    const result = await Product.updateOne({ id: id }, { $set: updateData });

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Product not found to update' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ error: `Failed to update product: ${error.message}` });
  }
};


exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const staff = await Staff.findOne({ _id: req.params.id });
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("ไม่พบข้อทูลพนักงาน");
    }
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      error: (Message = "เกิดข้อผิดพลาด") + error.message,
    });
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { id, title, detail, date, price, picture } = req.body;

    // ตรวจสอบข้อมูลเบื้องต้น
    if (!title || !date || !price || !picture) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({
      id,
      title,
      detail,
      date,
      price,
      picture,
    });

    await product.save();
    res.status(201).json({ message: "Product successfully added" });
  } catch (error) {
    console.error("Error in insert function:", error);
    res.status(500).json({ error: `Error adding product: ${error.message}` });
  }
};