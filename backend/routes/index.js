const express = require('express');
const router = express.Router();

router.use('/', require('./user.js'));

module.exports = router;
