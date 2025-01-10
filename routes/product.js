const express = require('express');
const router = express.Router();
const prodectcontrolloers = require('../controlloers/prodectcontrolloers');
/* GET users listing. */
router.get('/', prodectcontrolloers.index);
// router.get('/login', userscontrollers.login);

module.exports = router;
