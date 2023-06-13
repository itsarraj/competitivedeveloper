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
        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            '30m'
        );
        // const slicedToken = emailVerificationToken.split('.')[0];
        // const encodedPath = user._id.toString() + '/' + slicedToken;

        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        console.log('url to send to email', url);
        // await sendVerificationEmail(user.email, user.first_name, url);

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
const { comparePassword } = require('../models/User.js');

exports.activateAccount = async (req, res) => {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const check = await User.findById(user.id);

        if (check?.verified == true) {
            return res
                .status(400)
                .json({ message: 'This email is already activated ' });
        } else {
            await User.findByIdAndUpdate(user.id, {
                verified: true,
            });
            return res
                .status(200)
                .json({ message: 'Account has been activated successfully.' });
        }
    } catch (error) {
        console.log(error);
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                message:
                    'The email address you entered is not associated with this organisation',
            });
        }

        const check = await user.comparePassword(
            password,
            function (error, isMatch) {
                if (error) {
                    console.log(error);
                }
                if (isMatch) {
                    const token = generateToken(
                        { id: user._id.toString() },
                        '7d'
                    );
                    if (user.verified) {
                        res.send({
                            id: user._id,
                            username: user.username,
                            picture: user.picture,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            token: token,
                            verified: user.verified,
                            message: 'Login Success | Account Activated',
                        });
                    } else {
                        res.send({
                            id: user._id,
                            username: user.username,
                            picture: user.picture,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            token: token,
                            verified: user.verified,
                            message:
                                'Login Success | please activate your email to start',
                        });
                    }
                } else {
                    return res.status(400).json({
                        message: 'Invalid credentials',
                    });
                }
            }
        );
    } catch (error) {}
};
