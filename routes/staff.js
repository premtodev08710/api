const express = require('express');
const router = express.Router();
const staffcontrolloers = require('../controlloers/staffcontrolloers');
/* GET staff http://localhost:3000/staff listing. */
router.get('/', staffcontrolloers.index);
/* GET by ID staff http://localhost:3000/staff/677d5408836ebb059040cfc0 listing. */
router.get('/:id', staffcontrolloers.show);
router.post('/', staffcontrolloers.insert);
router.delete('/:id', staffcontrolloers.destroy);

module.exports = router;
