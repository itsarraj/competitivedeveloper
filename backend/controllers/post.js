const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        // const { title, body } = req.body;
        // const post = new Post({
        //     title,
        //     body,
        //     postedBy: req.user.id,
        // });
        // await post.save();

        const post = await new Post(req.body).save();
        res.json({
            message: 'Post created',
            post,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {}
};
