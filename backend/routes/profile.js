const express = require('express');
const { getUserProfile, setUserProfile } = require('../controllers/profile');
const { authUser } = require('../middleware/auth');
const router = express.Router();

router.get('/profile', authUser, getUserProfile);
router.post('/profile', authUser, setUserProfile);

module.exports = router;
