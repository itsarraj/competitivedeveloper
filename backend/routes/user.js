const express = require('express');
const {
    register,
    activateAccount,
    login,
    auth,
} = require('../controllers/user');
const { authUser } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activate', authUser, activateAccount);

module.exports = router;
