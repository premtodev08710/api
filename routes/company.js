const express = require('express');
const router = express.Router();
const companycontrolloers = require('../controlloers/companycontrolloers');
/* GET users listing. */
router.get('/', companycontrolloers.index);
// router.get('/login', userscontrollers.login);

module.exports = router;
