const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        type: {
            type: String,
            default: null,
        },
        text: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: [
            {
                comment: {
                    type: String,
                },
                commentBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                commentAt: {
                    type: Date,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', postSchema);
