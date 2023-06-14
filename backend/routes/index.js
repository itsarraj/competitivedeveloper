const express = require('express');
const router = express.Router();

router.use('/', require('./user.js'));
router.use('/', require('./post.js'));
router.use('/', require('./profile.js'));

module.exports = router;
