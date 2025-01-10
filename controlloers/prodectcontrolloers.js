
const Product = require('../models/product');

exports.index = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      data: product || 'No company found',
    });
  } catch (error) {
    console.error('Error in index function:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

