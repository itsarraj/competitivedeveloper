const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const defaultProfilePath = path.join(
    __dirname,
    '..',
    '..',
    'storage',
    'defaultprofile.png'
);

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            text: true,
        },
        last_name: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            text: true,
        },
        username: {
            type: String,
            required: [true, 'username name is required'],
            trim: true,
            text: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        picture: {
            type: String,
            trim: true,
            default: defaultProfilePath,
        },
        cover: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            required: [true, 'gender is required'],
            trim: true,
        },
        birthYear: {
            type: Number,
            required: true,
            trim: true,
        },
        birthMonth: {
            type: Number,
            required: true,
            trim: true,
        },
        birthDay: {
            type: Number,
            required: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
        friends: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        follwers: {
            type: Array,
            default: [],
        },
        requests: {
            type: Array,
            default: [],
        },
        search: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        details: {
            bio: {
                type: String,
            },
            otherName: {
                type: String,
            },
            job: {
                type: String,
            },
            workplace: {
                type: String,
            },
            highschool: {
                type: String,
            },
            college: {
                type: String,
            },
            currentCity: {
                type: String,
            },
            hometown: {
                type: String,
            },
            relationship: {
                type: String,
                enum: [
                    'Single',
                    'Married',
                    'In a relationship',
                    'Engaged',
                    'Complicated',
                    'Divorced',
                ],
            },
            Instagram: {
                type: String,
            },
        },
        savedPosts: [
            {
                post: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Post',
                },
                savedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePassword = function (userPass, cb) {
    try {
        bcrypt.compare(userPass, this.password, function (err, result) {
            if (err) {
                return cb(err);
            }
            // console.log('user compare pass', result);

            return cb(null, result);
        });
    } catch (error) {
        console.log(error);
    }
};

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        // console.log('this.password ', this.password);
        // console.log('salt ', salt);
        bcrypt.hash(this.password, salt, (err, result) => {
            // console.log('result ', result);
            this.password = result;
            // console.log('This password ', this.password);
            return next();
        });
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
