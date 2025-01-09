
const Company = require('../models/company');

exports.index = async (req, res, next) => {
  try {
    const company = await Company.findOne();
    res.status(200).json({
      data: company || 'No company found',
    });
  } catch (error) {
    console.error('Error in index function:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

