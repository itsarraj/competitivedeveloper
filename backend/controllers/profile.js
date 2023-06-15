const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    } catch (error) {}
};

exports.setUserProfile = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByIdAndUpdate(req.user.id, req.body);

        res.json({ message: 'Update Success ', user: user });
    } catch (error) {}
};
