const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const {
    validateEmail,
    validateLength,
    validateUsername,
} = require('../helpers/validation.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens.js');
const { sendVerificationEmail } = require('../helpers/mailer.js');
exports.register = async (req, res) => {
    try {
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
        const check = await User.findOne({ email });
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

        const emailVerificationToken = generateToken({ id: user._id }, '30m');
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        await sendVerificationEmail(user.email, user.first_name, url);
        // Login
        const token = generateToken({ id: user._id.toString() }, '7d');
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: 'Register Success | please activate your email to start',
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.activateAccount = async (req, res) => {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);

    if (check?.verified == true) {
        return res
            .status(400)
            .json({ message: 'This email is already activated ' });
    } else {
        const update = await User.findByIdAndUpdate(user.id, {
            verified: true,
        });
        return res
            .status(200)
            .json({ message: 'Account has been activated successfully.' });
    }
};
