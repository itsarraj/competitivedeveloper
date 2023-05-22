const User = require('../models/User.js');

exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
};

exports.validateLength = (str, min, max) => {
    if (str.length < min || str.length > max) {
        return false;
    }
    return true;
};

exports.validateUsername = async (username) => {
    let flag = false;

    do {
        let check = await User.findOne({ username });
        if (check) {
            // change username
            username =
                username +
                (+new Date() * Math.random()).toString().substring(0, 1);
            flag = true;
        } else {
            flag = false;
        }
    } while (flag);
    return username;
};
