const express = require('express');
const { createPost, getAllPosts } = require('../controllers/post');
const { authUser } = require('../middleware/auth');
const router = express.Router();

router.post('/create-post', authUser, createPost);
router.get('/get-all-posts', authUser, getAllPosts);

module.exports = router;
