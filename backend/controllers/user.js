const User = require('../models/User.js');
const { validateEmail } = require('../helpers/validation.js');
exports.register = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const {
            first_name,
            last_name,
            username,
            email,
            password,
            birthYear,
            birthMonth,
            birthDay,
            gender,
        } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).send({ message: 'Invalid Email' });
        }

        const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password,
            birthYear,
            birthMonth,
            birthDay,
            gender,
        });
        res.json({ user });
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
