const express = require('express');
const router = express.Router();
const userscontrollers = require('../controlloers/userscontrolloers');
/* GET users listing. */
router.get('/', userscontrollers.index);
router.get('/login', userscontrollers.login);

module.exports = router;
