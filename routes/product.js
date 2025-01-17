const express = require('express');
const router = express.Router();
const prodectcontrolloers = require('../controlloers/prodectcontrolloers');
/* GET users listing. */
router.get('/', prodectcontrolloers.index);
router.post('/', prodectcontrolloers.insert);
router.delete('/:id', prodectcontrolloers.destroy);
router.put('/:id', prodectcontrolloers.update);
router.get('/:id', prodectcontrolloers.show);

// router.get('/login', userscontrollers.login);

module.exports = router;
