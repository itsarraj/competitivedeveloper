const User = require('../models/User.js');
const {
    validateEmail,
    validateLength,
    validateUsername,
} = require('../helpers/validation.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens.js');

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
        const check = await User.findOne({ email: email });
        console.log('check', check);
        if (check) {
            return res.status(400).send({ message: 'Email already exists' });
        }
        if (!validateLength(first_name, 1, 100)) {
            return res.status(400).send({
                message: 'First Name must be greater than 1 & Less than 100',
            });
        }
        if (!validateLength(last_name, 1, 100)) {
            return res.status(400).send({
                message: 'First Name must be greater than 1 & Less than 100',
            });
        }
        if (!validateLength(password, 6, 100)) {
            return res.status(400).send({
                message: 'Password must be greater than 6 & Less than 100 ',
            });
        }
        // const cryptedPassword = await bcrypt.hash(password, 12);
        let tempUsername = first_name + last_name;
        let newUsername = await validateUsername(tempUsername);
        console.log('newUsername', newUsername);
        const user = await User.create({
            first_name,
            last_name,
            username: newUsername,
            email,
            password,
            birthYear,
            birthMonth,
            birthDay,
            gender,
        });

        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            '30m'
        );
        console.log('emailVerificationToken', emailVerificationToken);

        res.json({ user });
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
