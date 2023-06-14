const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        console.log(req.user.id);
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    } catch (error) {}
};

exports.setUserProfile = async (req, res) => {
    try {
        res.json({ Thanks: 'for using this route ' });
    } catch (error) {}
};
